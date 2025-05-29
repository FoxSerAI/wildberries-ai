document.addEventListener("DOMContentLoaded", () => {
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

  let appState = {
    token: "",
    products: [],
    error: "",
    searchQuery: ""
  };

  function setToken(value) {
    appState.token = value;
    render();
  }

  function setSearchQuery(value) {
    appState.searchQuery = value;
    render();
  }

  function fetchWBProducts() {
    if (!appState.token.trim()) {
      alert("Введите API-токен");
      return;
    }
    // Здесь можно добавить запрос к WB API
    appState.products = mockProducts;
    appState.error = "";
    render();
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
      <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ccc;">
        <h4 style="font-weight:bold;">💡 Рекомендации:</h4>
        <p style="color: green;">👉 Улучшенное название: ${suggestTitle(product.name)}</p>
        ${missingKeywords.length > 0 ? `<p style="color: orange;">🔍 Добавьте ключевые слова: ${missingKeywords.join(", ")}</p>` : ""}
      </div>
    `;
  }

  function ProductCard(product) {
    return `
      <div style="background:white; padding:1rem; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="font-weight:bold;">${product.name}</h3>
        <p>Просмотры: ${product.views}</p>
        <p>Выкупы: ${product.sales}</p>
        <p>Цена: ${product.price} ₽</p>
        <p>Остатки: ${product.stock}</p>
        ${AIRecommendations(product)}
      </div>
    `;
  }

  function render() {
    const filtered = appState.products.filter(p =>
      p.name.toLowerCase().includes(appState.searchQuery.toLowerCase())
    );

    const productCards = filtered.map(ProductCard).join("");

    const headerHTML = `
      <header style="background:#4F46E5; color:white; padding:1rem; text-align:center;">
        <h1 style="font-size:1.5rem; font-weight:bold;">🤖 AI для Wildberries</h1>
        <p>Автоматизация карточек и аналитики 24/7</p>
      </header>
    `;

    const authSectionHTML = `
      <section style="padding:1rem; background:white; border-bottom:1px solid #eee;">
        <div style="max-width:600px; margin:auto;">
          <label>🔐 Введите ваш API-токен:</label><br/>
          <input type="password" value="${appState.token}" onInput="setToken(event.target.value)" placeholder="Ваш токен от Wildberries Seller" style="width:100%; padding:0.5rem;" />
          <button onclick="fetchWBProducts()" style="margin-top:0.5rem; background:#4F46E5; color:white; padding:0.5rem 1rem; border:none; border-radius:4px;">Подключиться</button>
        </div>
      </section>
    `;

    const searchSectionHTML = `
      <section style="padding:1rem; background:white;">
        <div style="max-width:600px; margin:auto;">
          <input type="text" value="${appState.searchQuery}" onInput="setSearchQuery(event.target.value)" placeholder="Поиск по названию товара..." style="width:100%; padding:0.5rem;" />
        </div>
      </section>
    `;

    const mainHTML = `
      <main style="padding:1rem; max-width:1000px; margin:auto;">
        <h2 style="font-size:1.5rem; font-weight:bold;">📦 Все ваши товары</h2>
        <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          ${productCards}
        </div>
      </main>
    `;

    root.innerHTML = headerHTML + authSectionHTML + searchSectionHTML + mainHTML;
  }

  window.setToken = setToken;
  window.fetchWBProducts = fetchWBProducts;
  window.setSearchQuery = setSearchQuery;

  // Сразу покажем моковые данные для тестирования
  appState.products = mockProducts;
  render();
});
