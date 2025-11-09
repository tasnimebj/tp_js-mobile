import express from "express";
const router = express.Router();

const books = [];

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.get("/", ensureAuth, (req, res) => {
  const stats = {
    totalPages: books.reduce((s, b) => s + b.pages, 0),
    totalRead: books.reduce((s, b) => s + b.pagesRead, 0),
  };
  stats.globalPct = stats.totalPages
    ? Math.round((stats.totalRead / stats.totalPages) * 100)
    : 0;
  res.render("books", { books, stats });
});

router.post("/", ensureAuth, (req, res) => {
  const { title, author, pages, pagesRead } = req.body;
  books.push({ title, author, pages: Number(pages), pagesRead: Number(pagesRead || 0) });
  res.redirect("/books");
});

export default router;
