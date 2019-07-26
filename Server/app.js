const Express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
mongoose.connect("mongodb://localhost/casa_inteligenta_api");
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    Response.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

var Schema = mongoose.Schema;

var lumini = new Schema({
  locatie_lumina: String,
  stare: Number
});

var ventilatoare = new Schema({
  id: Number,
  stare: Number
});

var garaj = new Schema({
  stare: Number,
  stare_actiune: Number
});

var dht = new Schema({
  temperatura: Number,
  umiditate: Number,
  data: Date
});
var armare = new Schema({
  stare: Number
});
var praf = new Schema({
  cantitate_praf: Number,
  data: Date
});

var CO = new Schema({
  cantitate_co: Number,
  data: Date
});
var LuminiModel = new mongoose.model("Lumini", lumini);
var VentilatoareModel = new mongoose.model("Ventilatoare", ventilatoare);
var GarajModel = new mongoose.model("Garaj", garaj);
var DhtModel = new mongoose.model("DHT", dht);
var armareModel = new mongoose.model("armare", armare);
var prafModel = new mongoose.model("praf", praf);
var coModel = new mongoose.model("co", CO);
var cors = require("cors");
app.use(cors());


app.post("/garaj", function(req, res, next) {
  GarajModel.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
app.get("/garaj", async (request, response) => {
  try {
    var result = await GarajModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.put("/garaj/:id", async (request, response) => {
  try {

    var query = await GarajModel.findById(request.params.id).exec();
    query.set(request.body);

    var result = await query.save();

    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.get("/garaj/:id", async (request, response) => {
  try {
    var query = await GarajModel.findById(request.params.id).exec();
    response.send(query);
  } catch (err) {
    response.status(500).send(err);
  }
});

app.post("/lumini", async (request, response) => {
  try {
    var lumina = new LuminiModel(request.body);
    var result = await lumina.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/lumini", async (request, response) => {
  try {
    var result = await LuminiModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.put("/lumini/:id", function(req, res, next) {
  LuminiModel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
app.get("/lumini/:id", function(req, res, next) {
  LuminiModel.findById(req.params.id, function(err, get) {
    if (err) return next(err);
    res.json(get);
  });
});

app.post("/ventilatoare", async (req, res) => {
  try {
    var ventilator = new VentilatoareModel(req.body);
    var result = await ventilator.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/ventilatoare", async (req, res) => {
  try {
    res.send(await VentilatoareModel.find().exec());
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/ventilatoare/:id", function(req, res, next) {
  VentilatoareModel.findByIdAndUpdate(req.params.id, req.body, function(
    err,
    put
  ) {
    if (err) return next(err);
    res.json(put);
  });
});
app.get("/ventilatoare/:id", async (req, res) => {
  try {
    res.send(await VentilatoareModel.findById(req.params.id).exec());
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/dht", async (req, res) => {
  try {
    var dht = new DhtModel(req.body);
    var result = await dht.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/dht", async (req, res) => {
  try {
    res.send(await DhtModel.find().exec());
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/dht/:id", function(req, res, next) {
  DhtModel.findByIdAndUpdate(req.params.id, req.body, function(err, put) {
    if (err) return next(err);
    res.json(put);
  });
});
app.get("/dht/:id", async (req, res) => {
  try {
    res.send(await DhtModel.findById(req.params.id).exec());
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/armare", async (request, response) => {
  try {
    var lumina = new armareModel(request.body);
    var result = await lumina.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/armare", async (request, response) => {
  try {
    var result = await armareModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.put("/armare/:id", function(req, res, next) {
  armareModel.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
app.get("/armare/:id", async (req, res) => {
  try {
    res.send(await armareModel.findById(req.params.id).exec());
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/praf", async (req, res) => {
  try {
    var praf = new prafModel(req.body);
    var result = await praf.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/praf", async (req, res) => {
  try {
    res.send(await prafModel.find().exec());
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/praf/:id", function(req, res, next) {
  prafModel.findByIdAndUpdate(req.params.id, req.body, function(err, put) {
    if (err) return next(err);
    res.json(put);
  });
});
app.get("/praf/:id", async (req, res) => {
  try {
    res.send(await prafModel.findById(req.params.id).exec());
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/co", async (req, res) => {
  try {
    var co = new coModel(req.body);
    var result = await co.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/co", async (req, res) => {
  try {
    res.send(await coModel.find().exec());
  } catch (err) {
    res.status(500).send(err);
  }
});
app.put("/co/:id", function(req, res, next) {
  coModel.findByIdAndUpdate(req.params.id, req.body, function(err, put) {
    if (err) return next(err);
    res.json(put);
  });
});
app.get("/co/:id", async (req, res) => {
  try {
    res.send(await coModel.findById(req.params.id).exec());
  } catch (err) {
    res.status(500).send(err);
  }
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
