const fs = require("fs");
const DenseGraph = require('./denseGraph');
const SparseGraph = require('./sparseGraph');
const LazyPrim = require('./lazyPrim');
const Prim = require('./prim');
const Kruskal = require('./kruskal');

fs.readFile("./testG1.txt", 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  const strs = data.split('\n');
  const graph = new DenseGraph(Number(strs[0].split(' ')[0]), false);
  for (let i = 1; i < strs.length; i++) {
    let [v, w, weight] = strs[i].split(' ');
    graph.AddEdge(Number(v), Number(w), Number(weight));
  }

  console.log("%s", graph);

  const graph2 = new SparseGraph(Number(strs[0].split(' ')[0]), false);
  for (let i = 1; i < strs.length; i++) {
    let [v, w, weight] = strs[i].split(' ');
    graph2.AddEdge(Number(v), Number(w), Number(weight));
  }

  console.log("%s", graph2);

  console.time("LazyPrim");
  const lazyPrim = new LazyPrim(graph2);
  console.timeEnd("LazyPrim");
  console.log(lazyPrim.Result());
  let edges = lazyPrim.MSTEdges();
  for (let i = 0; i < edges.length; i++) {
    console.log("%s", edges[i]);
  }

  console.time("Prim");
  const prim = new Prim(graph2);
  console.timeEnd("Prim");
  console.log(prim.Result());
  edges = prim.MSTEdges();
  for (let i = 0; i < edges.length; i++) {
    console.log("%s", edges[i]);
  }

  console.time("Kruskal");
  const kruskal = new Kruskal(graph2);
  console.timeEnd("Kruskal");
  console.log(kruskal.Result());
  edges = kruskal.MSTEdges();
  for (let i = 0; i < edges.length; i++) {
    console.log("%s", edges[i]);
  }
});