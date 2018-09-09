const SparseGraph = require('./sparseGraph');
const Dijkstra = require('./dijkstra');
const BellmanFord = require('./bellmanFord');
const fs = require("fs");

fs.readFile("./testG1.txt", 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  const strs = data.split('\n');
  const graph2 = new SparseGraph(Number(strs[0].split(' ')[0]), false);
  for (let i = 1; i < strs.length; i++) {
    let [v, w, weight] = strs[i].split(' ');
    graph2.AddEdge(Number(v), Number(w), Number(weight));
  }

  const dj = new Dijkstra(graph2, 0);
  for (let i = 1; i < graph2.V(); i++) {
    if (dj.HasPathTo(i)) {
      console.log("Shortest Path to %s : %s", i, dj.ShortestPathTo(i));
      dj.ShowPath(i);
    } else {
      console.log("No path to %s", i);
    }
  }
});

fs.readFile("./testG2.txt", 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  const strs = data.split('\n');
  const graph2 = new SparseGraph(Number(strs[0].split(' ')[0]), true);
  for (let i = 1; i < strs.length; i++) {
    let [v, w, weight] = strs[i].split(' ');
    graph2.AddEdge(Number(v), Number(w), Number(weight));
  }


  console.log("Bellman Ford");
  const bm = new BellmanFord(graph2, 0);
  for (let i = 1; i < graph2.V(); i++) {
    if (bm.HasPathTo(i)) {
      console.log("Shortest Path to %s : %s", i, bm.ShortestPathTo(i));
      bm.ShowPath(i);
    } else {
      console.log("No path to %s", i);
    }
  }
});
