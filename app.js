const root = document.getElementById("root");

const mockProducts = [
  {
    id: 1,
    name: "Грибы рейши органические",
    views: 3500,
    sales: 89,
    price: 1190,
    stock: 150,
    description: "Органические грибы рейши, выращенные без химикатов.",
    keywords: ["грибы рейши", "сушеные грибы", "здоровье"],
    active: true
  },
  {
    id: 2,
    name: "Белые сушеные грибы",
    views: 2200,
    sales: 60,
    price: 990,
    stock: 80,
    description: "Сушеные лесные белые грибы для супов и вторых блюд.",
    keywords: ["белые грибы", "сушеные грибы", "для супа"],
    active: false
  }
];

function App() {
  const [token, setToken] = {
    value: "",
    onChange: (e) => setApp({...window.app, token: e.target.value})
  };

  const [products, setProducts] = {
    value: [],
    onChange: (newProducts) => {
      window.app.products = newProducts;
      render();
    }
  };

  const [error, setError] = {
    value: "",
    onChange: (msg) => {
      window.app.error = msg;
      render();
    }
  };

  const [searchQuery, setSearchQuery] = {
    value: "",
    onChange: (e) => {
      window.app.searchQuery = e.target.value;
      render();
    }
  };

  function fetchWBProducts() {
    if (!token.value || token.value.trim().length === 0) {
      setError.onChange("Введите токен");
      return;
    }

    // Здесь можно добавить реальный запрос к API
    setError.onChange("");
    setProducts.onChange(mockProducts);
  }

  function suggestTitle(name) {
    let title = name;
    if (!title.toLowerCase().includes("рейши")) title = `Грибы рейши ${title}`;
    if (!title.endsWith("сушеные")) title += " сушеные";
    return title;
  }

  function AIRecommendations(product) {
    const goodKeywords = ["грибы рейши", "сушеные грибы", "здоровое питание"];
    const missingKeywords = goodKeywords.filter(k => !product.keywords.includes(k));

    return `
      <div class="mt-2 pt-2 border-t border-gray-200">
        <h4 class="font-semibold">💡 Рекомендации:</h4>
        <p class="text-green-600">👉 Название: ${suggestTitle(product.name)}</p>
        <p class="text-orange-600">${missingKeywords.length > 0 ? "🔍 Добавьте ключевые слова: " + missingKeywords.join(", ") : ""}</p>
      </div>
    `;
  }

  function ProductCard(product) {
    return `
      <div class="card mb-4">
        <h3 class="font-bold">${product.name}</h3>
        <p>Просмотры: ${product.views}</p>
        <p>Выкупы: ${product.sales}</p>
        <p>Цена: ${product.price} ₽</p>
        <p>Остатки: ${product.stock}</p>
        ${AIRecommendations(product)}
      </div>
    `;
  }

  function render() {
    const filtered = products.value.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );

    const productCards = filtered.map(ProductCard).join("");

    root.innerHTML = `
      <header>
        <h1>🤖 AI для Wildberries</h1>
        <p>Автоматизация карточек и аналитики 24/7</p>
      </header>

      <section style="padding: 1rem; background: white; border-bottom: 1px solid #eee">
        <div style="max-width: 600px; margin: auto;">
          <label>🔐 Введите ваш API-токен:</label><br/>
          <input type="password" value="${token.value}" onInput="${token.onChange.toString()}(event)" placeholder="Ваш токен" style="width: 100%; padding: 0.5rem;" />
          <button onclick="${fetchWBProducts.toString()}" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #4F46E5; color: white; border: none; border-radius: 4px;">Подключиться</button>
        </div>
      </section>

      <section style="padding: 1rem; background: white;">
        <div style="max-width: 600px; margin: auto;">
          <input type="text" value="${searchQuery.value}" onInput="${searchQuery.onChange.toString()}(event)" placeholder="Поиск по названию товара..." style="width: 100%; padding: 0.5rem;" />
        </div>
      </section>

      <main style="padding: 1rem; max-width: 1000px; margin: auto;">
        <h2 style="font-size: 1.5rem; font-weight: bold;">📦 Все ваши товары</h2>
        <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          ${productCards}
        </div>
      </main>
    `;
  }

  window.app = { token, products, error, searchQuery };
  render();
}

// Запускаем приложение при загрузке
document.addEventListener("DOMContentLoaded", () => {
  App();
});