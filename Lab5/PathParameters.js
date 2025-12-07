export default function PathParameters(app) {

    const add = (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) + parseInt(b);
      res.send(sum.toString());
    };
    app.get("/lab5/add/:a/:b", add);

    const subtract = (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
      };
    app.get("/lab5/subtract/:a/:b", subtract);

    const multiply = (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) * parseInt(b);
      res.send(sum.toString());
    };
  app.get("/lab5/multiply/:a/:b", multiply);

  const divide = (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) / parseInt(b);
    res.send(sum.toString());
  };
app.get("/lab5/divide/:a/:b", divide);
}