using Ganss.Xss;
using Markdig;
using Markdig.Extensions.Yaml;
using Markdig.Renderers;
using Markdig.Syntax;
using System.Globalization;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace web_api;

public sealed class JamieNamingConvention : INamingConvention
{
    public string Apply(string value)
    {
        if (string.IsNullOrEmpty(value))
        {
            return value;
        }

        var result = new System.Text.StringBuilder();
        for (int i = 0; i < value.Length; i++)
        {
            char c = value[i];
            if (char.IsUpper(c))
            {
                if (i > 0)
                {
                    result.Append('_');
                }
                result.Append(char.ToLowerInvariant(c));
            }
            else
            {
                result.Append(c);
            }
        }
        return result.ToString();
    }

    public string Reverse(string value)
    {
        return value;
    }

    public static readonly INamingConvention Instance = new JamieNamingConvention();
}

public class ContentService
{
    private readonly Dictionary<string, Post> _posts;
    private readonly MarkdownPipeline _pipeline;

    public ContentService()
    {
        _pipeline = new MarkdownPipelineBuilder()
            .UseYamlFrontMatter()
            .UseAdvancedExtensions() // Necessary for tables/mermaid blocks
            .Build();
        _posts = LoadPosts();
    }

    private Dictionary<string, Post> LoadPosts()
    {
        var dict = new Dictionary<string, Post>();
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(JamieNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();
        var contentPath = Path.Combine(AppContext.BaseDirectory, "Content");
        var directory = Directory.GetFiles(contentPath, "*.md", SearchOption.AllDirectories);

        foreach (var filePath in directory)
        {
            var slug = Path.GetFileNameWithoutExtension(filePath);
            var text = File.ReadAllText(filePath);
            var document = Markdown.Parse(text, _pipeline);

            // 1. Extract Metadata
            var yamlBlock = document.Descendants<YamlFrontMatterBlock>().FirstOrDefault();
            var meta = yamlBlock != null
                ? deserializer.Deserialize<PostMeta>(yamlBlock.Lines.ToString())
                : new PostMeta();

            // 2. Split into blocks by H2
            var blocks = SplitByH2(document, _pipeline);

            dict[slug] = new Post(slug, meta, blocks, document.ToHtml(_pipeline));
        }
        return dict;
    }

    private List<ContentBlock> SplitByH2(MarkdownDocument document, MarkdownPipeline pipeline)
    {
        var result = new List<ContentBlock>();
        var currentBlocks = new List<Block>();
        string currentTitle = "Introduction";

        foreach (var node in document)
        {
            if (node is YamlFrontMatterBlock) continue;

            if (node is HeadingBlock heading && heading.Level == 2)
            {
                // 1. Render accumulated blocks to HTML
                if (currentBlocks.Any())
                {
                    result.Add(new ContentBlock(currentTitle, RenderBlocksToHtml(currentBlocks, pipeline)));
                }

                // 2. Start new section
                currentTitle = heading.Inline?.FirstChild?.ToString() ?? "Untitled";
                currentBlocks.Clear();
            }
            else
            {
                currentBlocks.Add(node);
            }
        }

        // Add final section
        if (currentBlocks.Any())
        {
            result.Add(new ContentBlock(currentTitle, RenderBlocksToHtml(currentBlocks, pipeline)));
        }

        return result;
    }

    private string RenderBlocksToHtml(List<Block> blocks, MarkdownPipeline pipeline)
    {
        var writer = new StringWriter();
        var renderer = new HtmlRenderer(writer);
        pipeline.Setup(renderer);

        foreach (var block in blocks)
        {
            renderer.Render(block);
        }

        return writer.ToString();
    }

    public List<Post> GetAll() => _posts.Values.OrderByDescending(x => x.Meta.CreatedAt).ToList();

    public List<Post> GetBySeries(string slug) => _posts.Values.Where(x => x.Meta.Series == slug).ToList();

    public Post? Get(string slug) => _posts.GetValueOrDefault(slug);

    public List<string> Categories() =>
        _posts.Values
            .SelectMany(x => x.Meta.Category ?? Enumerable.Empty<string>())
            .Distinct()
            .OrderBy(x => x)
            .ToList();

    public List<string> Industries() =>
        _posts.Values
            .Where(x => !string.IsNullOrEmpty(x.Meta.Industry))
            .Select(x => x.Meta.Industry)
            .Distinct()
            .OrderBy(x => x)
            .ToList();

    public List<string> Difficulty() =>
        _posts.Values
            .Where(x => !string.IsNullOrEmpty(x.Meta.Difficulty))
            .Select(x => x.Meta.Difficulty)
            .Distinct()
            .OrderBy(x => x)
            .ToList();
}

// Data Models
public class PostMeta
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Difficulty { get; set; } = "";
    public string ExampleBusiness { get; set; } = "";
    public string Industry { get; set; } = "";
    public DateTime CreatedAt { get; set; } = default;
    public List<string>? Category { get; set; } = null;
    public List<string>? Tags { get; set; } = null;
    public string Series { get; set; } = "";
    public bool IsSeries { get; set; } = false;
    public int AccessLevel { get; set; } = 0;
}

public record Post(
    string Slug,
    PostMeta Meta,
    List<ContentBlock> HtmlBlocks, 
    string FullHtml // Optional: keep for convenience
);

public record ContentBlock(string Title, string Value);