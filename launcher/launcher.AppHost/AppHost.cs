var builder = DistributedApplication.CreateBuilder(args);

var dotnetApi = builder
    .AddProject<Projects.web_api>("api");

var reactApp = builder
    .AddViteApp("base-app", "../../app")
    .WithExternalHttpEndpoints();

var marketingApp = builder
    .AddViteApp("landing", "../../landing")
    .WithExternalHttpEndpoints();

builder
    .AddSwaEmulator("app")
    .WithAppResource(reactApp)
    .WithApiResource(dotnetApi);

builder.Build().Run();









