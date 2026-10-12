(function () {
  const cfg = window.SEMINAR_CONFIG;
  let STATE = {};

  function el(tag, attrs, text) {
    const n = document.createElement(tag);
    for (const k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  function msg(text) {
    document.getElementById("msg").textContent = text;
  }

  function emptyState() {
    const s = {};
    cfg.dates.forEach((d) => (s[d] = Array(cfg.seats).fill("")));
    return s;
  }

  function render() {
    const root = document.getElementById("list");
    root.textContent = "";
    cfg.dates.forEach((d) => {
      const row = el("section", { class: "row" });
      row.append(el("h3", { class: "date" }, d));
      const slots = el("div", { class: "slots" });
      (STATE[d] || []).forEach((name, i) => {
        const slot = el("div", { class: "slot" + (name ? " taken" : "") });
        slot.append(el("span", { class: "label" }, "Loc " + (i + 1)));
        if (name) {
          slot.append(el("span", { class: "name" }, name));
        } else {
          const form = el("form", { class: "join" });
          const input = el("input", {
            type: "text",
            placeholder: "Numele tău",
            maxlength: "60",
            "aria-label": "Loc " + (i + 1) + ", " + d,
          });
          const btn = el("button", { type: "submit" }, "Înscrie-mă");
          form.append(input, btn);
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            join(d, i, input.value.trim());
          });
          slot.append(form);
        }
        slots.append(slot);
      });
      row.append(slots);
      root.append(row);
    });
  }

  async function load() {
    if (!cfg.endpoint || cfg.endpoint.startsWith("PUNE_")) {
      STATE = emptyState();
      render();
      msg("Înscrierile nu sunt configurate încă.");
      return;
    }
    try {
      const res = await fetch(cfg.endpoint);
      STATE = Object.assign(emptyState(), await res.json());
      render();
    } catch (err) {
      STATE = emptyState();
      render();
      msg("Nu s-au putut încărca locurile. Reîncarcă pagina.");
    }
  }

  async function join(d, i, name) {
    if (!name) {
      msg("Scrie numele tău înainte să te înscrii.");
      return;
    }
    try {
      // Trimis ca text simplu ca să evite preflight CORS la Apps Script.
      const res = await fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ date: d, seat: i, name: name }),
      });
      const data = await res.json();
      if (data.ok) {
        STATE = Object.assign(emptyState(), data.state);
        render();
        msg("Înscrierea a fost salvată.");
      } else if (data.error === "taken") {
        STATE = Object.assign(emptyState(), data.state || {});
        render();
        msg("Locul acesta este deja ocupat.");
      } else {
        msg("Nu s-a putut salva. Încearcă din nou.");
      }
    } catch (err) {
      msg("Nu s-a putut salva. Verifică conexiunea și încearcă din nou.");
    }
  }

  load();
})();
