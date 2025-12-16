import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//file
const productfile = path.resolve("./MOCK_DATA.json");

// get 100 products
app.get("/api/products", (req, res) => {
  fs.readFile(productfile, "utf-8", (err, data) => {
    if (err)
      return res.status(500).json({ message: "Failed to read products file" });
    let products;
    try {
      products = JSON.parse(data);
      //   console.log(products);
    } catch (parseErr) {
      return res.status(500).json({ message: "Failed to parse products file" });
    }
    // res.json(products.slice(0, 100));
    res.status(200).json(products.slice(0, 100));
  });
});

// 2. GET /api/products/:id - get product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  fs.readFile(productfile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Faild to find your products" });
    }
    let products;
    try {
      products = JSON.parse(data);
    } catch (parseRrr) {
      return res
        .status(500)
        .json({ message: "Failed to parse the product file" });
    }

    const product = products.find((product) => product.id === productId);
    if (!product) {
      return res.status(404).json({ message: "Products Not Found" });
    }
    return res.json(product);
  });
});

// 3. POST /api/products - add a new product
app.post("/api/products", (req, res) => {
  const productData = req.body;

  fs.readFile(productfile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read products file" });
    }

    let products;
    try {
      products = JSON.parse(data);
      if (!Array.isArray(products)) {
        return res
          .status(500)
          .json({ message: "Products file is not an array" });
      }
    } catch (parseErr) {
      return res.status(500).json({ message: "Failed to parse products file" });
    }

    const newId = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    const newProduct = { id: newId, ...productData };

    products.push(newProduct);

    fs.writeFile(productfile, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save new product" });
      }

      res.status(201).json(newProduct);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
