
# Install

```bash
npm install json-server@v0.17.4
```

# Add /api Route

`routes.json`

```json
{
  "/api/*": "/$1"
}
```

# Run

```bash
npx json-server --watch db.json --routes routes.json --port 3000
```