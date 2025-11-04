from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    num_nodes = len(nodes)
    num_edges = len(edges)

    graph = {n["id"]: [] for n in nodes}
    for e in edges:
        src, tgt = e.get("source"), e.get("target")
        if src in graph:
            graph[src].append(tgt)

    def is_dag_check():
        visited, rec_stack = set(), set()
        def dfs(node):
            if node not in visited:
                visited.add(node)
                rec_stack.add(node)
                for nbr in graph.get(node, []):
                    if nbr not in visited and dfs(nbr):
                        return True
                    elif nbr in rec_stack:
                        return True
                rec_stack.remove(node)
            return False
        for node in graph:
            if dfs(node):
                return False
        return True

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag_check()
    }
