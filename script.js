const root = document.documentElement;

const colorMap = {
  a: "--color-accent",
  b: "--color-ink",
  da: "--color-muted",
  la: "--color-soft",
  w: "--color-paper",
};

const posts = {
  "six-ways": {
    category: "Travel",
    title: "Six Ways to (Legally) Work Anywhere",
    author: "Author Name",
    date: "7/24/19",
    archiveUrl: "travel.html",
    body: [
      "One of the most frequent questions I get is about how I have been able to pick up temporary work throughout my travels without falling afoul of the law.",
      "The short answer is that I plan around visas before I plan around destinations. Some countries make short contracts simple, some make them impossible, and some require enough paperwork that the job needs to be worth the wait.",
      "The useful work has usually been ordinary: editing menus, helping guesthouses with English copy, teaching short workshops, or trading a few hours of skilled help for a place to sleep. The graceful part is knowing when to say no."
    ],
  },
  mali: {
    category: "Travel",
    title: "Highlights from Mali",
    author: "Author Name",
    date: "7/21/19",
    archiveUrl: "travel.html",
    body: [
      "Frequent readers will know that Western Africa is one of my favorite parts of the world, so my expectations were already high when I secured a lift to Bamako.",
      "The city arrived slowly: a change in the air, then the traffic, then the feeling that everyone around me knew exactly where to go except me.",
      "My favorite moments were not the largest ones. They were courtyard conversations, small cups of tea, and the generosity of people who made room for a stranger without turning it into a performance."
    ],
  },
  "desert-etiquette": {
    category: "Travel",
    title: "Desert Etiquette",
    author: "Author Name",
    date: "7/10/19",
    archiveUrl: "travel.html",
    body: [
      "Just as sailors abide by the laws of the sea, desert inhabitants live by a code that keeps them safe in this often extreme environment.",
      "Lesson number one: Your water is everyone&rsquo;s water. You carry enough for yourself, then you carry more because the desert does not care whose mistake caused the shortage.",
      "The rest is patience. Leave early, rest when the heat asks you to rest, and listen closely to people who have crossed the same distance before."
    ],
  },
  cairo: {
    category: "Travel",
    title: "The Loudest City in the World",
    author: "Author Name",
    date: "7/1/19",
    archiveUrl: "travel.html",
    body: [
      "It is not New York or Shanghai. It is Cairo. Here are some tips and tricks for enjoying the cultural life of this great city without getting a headache or hearing loss.",
      "I learned to move through Cairo by choosing quiet pockets: early ferries, museum corners, a shaded cafe after the lunch rush, and side streets where the horns softened into the distance.",
      "The city rewards attention. Under the noise there is a rhythm, and once I stopped fighting it, I started hearing the smaller songs inside it."
    ],
  },
  algeria: {
    category: "Travel",
    title: "72 Hours in Algeria",
    author: "Author Name",
    date: "6/25/19",
    archiveUrl: "travel.html",
    body: [
      "While I generally try to travel the slow and steady way, sometimes opportunities arise that are too good to miss.",
      "When my friend Kahlil invited me to spend a weekend with his family in the Djebel Babor mountains, I had to make it happen.",
      "Three days was not enough to understand a place, but it was enough to understand an invitation: bread by the fire, long drives, and a family that treated my short visit like it mattered."
    ],
  },
  morocco: {
    category: "Travel",
    title: "Morocco's Royal Cities",
    author: "Author Name",
    date: "6/19/19",
    archiveUrl: "travel.html",
    body: [
      "Morocco has four historical capitals: Fez, Marrakesh, Meknes and Rabat. I spent a week in each and emerged with a clear favorite.",
      "Fez gave me the most to think about. Its lanes made me slow down, and its workshops made the past feel less like a museum than a daily practice.",
      "Still, every city had its own argument: Marrakesh with color, Meknes with calm, Rabat with sea air. The pleasure was letting each one be right in a different way."
    ],
  },
  cappadocia: {
    category: "Travel",
    title: "Cappadocia by Hot Air Balloon",
    author: "Guest User",
    date: "5/22/19",
    archiveUrl: "travel.html",
    body: [
      "I woke up to a mysterious text message from my friend Ekrem: \"I have got a one-of-a-kind job waiting for you in Cappadocia if you can make it here by Monday.\"",
      "By sunrise, the balloons had already begun to rise. They looked impossible at first, like lanterns someone forgot to tether to the earth.",
      "The job was ordinary, but the commute was not. Some mornings make even the most practical traveler believe in spectacle."
    ],
  },
  loneliness: {
    category: "Travel",
    title: "On Loneliness",
    author: "Author Name",
    date: "5/8/19",
    archiveUrl: "travel.html",
    body: [
      "Does it ever get lonely out on the road? Yes. But if you can learn to embrace loneliness, it can be a great teacher.",
      "Loneliness tells me when I have been moving too quickly, when I have used novelty as a substitute for attention, or when I need to call someone who has known me longer than a season.",
      "It is not always a problem to solve. Sometimes it is a room I sit in until I remember how to hear myself again."
    ],
  },
  greece: {
    category: "Travel",
    title: "A May Day Celebration in Greece",
    author: "Author Name",
    date: "5/1/19",
    archiveUrl: "travel.html",
    body: [
      "May Day may be a non-existent holiday in my native US, but the tradition is very much alive in Europe.",
      "In Greece, the day unfolded outdoors: flowers, food, slow walking, and the particular ease that arrives when no one expects the afternoon to be efficient.",
      "I kept thinking that holidays are a way of practicing attention. A day set aside can teach you how to notice the days that are not."
    ],
  },
  america: {
    category: "Travel",
    title: "Back to America",
    author: "Guest User",
    date: "4/23/19",
    archiveUrl: "travel.html",
    body: [
      "I am sitting in Bangkok's airport, about to board a plane to my wildest destination yet: my sister's wedding back home in Santa Cruz.",
      "Returning is its own kind of travel. The familiar becomes strange around the edges, and the person people remember is not always the person who walks through arrivals.",
      "I am curious what America will feel like after two years of constant motion. I suspect it will feel both smaller and more mysterious than before."
    ],
  },
  "scam-city": {
    category: "Travel",
    title: "Scam City",
    author: "Author Name",
    date: "4/1/19",
    archiveUrl: "travel.html",
    body: [
      "Let us celebrate April Fools' Day with a list of every scam I encountered in three weeks in Bangkok, shall we?",
      "The point is not that Bangkok is uniquely deceptive. The point is that popular places develop scripts, and tired travelers are easy audiences.",
      "My rule now is simple: slow down before saying yes. Most scams need momentum. A pause is often enough to make them fall apart."
    ],
  },
  essentials: {
    category: "Travel",
    title: "Only the Essentials",
    author: "Author Name",
    date: "3/6/19",
    archiveUrl: "travel.html",
    body: [
      "The last six years of travel have been a story of reduction. When I first set out, I was proud of myself for only bringing one backpack full of clever gear.",
      "Today, I see the world with only five essential items: a passport, a notebook, a scarf, a charger, and shoes I can trust.",
      "Everything else can usually be borrowed, bought, repaired, or lived without. That knowledge is lighter than any pack."
    ],
  },
  saung: {
    category: "Travel",
    title: "Learning to Play the Saung",
    author: "Author Name",
    date: "2/27/19",
    archiveUrl: "travel.html",
    body: [
      "The saung is Myanmar's most iconic musical instrument, a boat-shaped harp that sounds like nothing else.",
      "My first lesson was mostly humility. The teacher moved with calm precision, and I made sounds that suggested the harp was objecting to my presence.",
      "Still, there is pleasure in being bad at something with full attention. For an hour, the whole world became string, fingertip, and tone."
    ],
  },
  relationships: {
    category: "Travel",
    title: "Relationships and the Road",
    author: "Author Name",
    date: "2/14/19",
    archiveUrl: "travel.html",
    body: [
      "You cannot have a typical relationship while you travel the world, but that does not mean romance is always out of reach.",
      "The road makes everything honest quickly. It reveals who needs plans, who can tolerate uncertainty, and who understands that goodbye is not always a failure.",
      "I have learned to prefer clarity over drama. Affection can be temporary and still be real."
    ],
  },
  people: {
    category: "Travel",
    title: "People Are Good",
    author: "Author Name",
    date: "1/15/19",
    archiveUrl: "travel.html",
    body: [
      "One of the biggest adjustments for me when I first started traveling was losing my innate suspicion of other people.",
      "I am glad I did, because so much of my journey has been about the people I have met along the way.",
      "Caution is useful, but suspicion is heavy. Most days, the world has asked me to be alert and open at the same time."
    ],
  },
  "bring-buy": {
    category: "Travel",
    title: "Bring vs. Buy",
    author: "Author Name",
    date: "1/5/19",
    archiveUrl: "travel.html",
    body: [
      "A common mistake travelers make is packing things that can be easily and cheaply purchased once they arrive at their destination.",
      "The question is not whether an item might be useful. The question is whether it deserves to be carried through every bus station before the moment it becomes useful.",
      "Pack the hard-to-replace things. Let the rest meet you on the road."
    ],
  },
  bhutan: {
    category: "Travel",
    title: "Happy New Year from Bhutan",
    author: "Author Name",
    date: "1/1/19",
    archiveUrl: "travel.html",
    body: [
      "I went to Bhutan to see if its reputation for being the happiest country on earth was accurate.",
      "Spoiler alert: It is that and so much more. What stayed with me was not a statistic but a texture: quiet mornings, mountain air, and a pace that made space for reflection.",
      "Happiness, at least from where I stood, looked less like excitement than alignment."
    ],
  },
  "istanbul-eats": {
    category: "Food",
    title: "Cheap and Delicious Eats in Istanbul",
    author: "Author Name",
    date: "5/14/19",
    archiveUrl: "food.html",
    body: [
      "One of the most valuable things I have learned in my travels is that the best food in any destination is never at the fancy hotels.",
      "In Istanbul, the lesson repeats itself on nearly every corner: bread rings, lentil soup, grilled fish, tea, and small counters where regulars do not need to read the menu.",
      "Follow the locals and you will eat well and cheaply. More importantly, you will eat in the rhythm of the place."
    ],
  },
  "marrakesh-breakfast": {
    category: "Food",
    title: "Breakfast in Marrakesh",
    author: "Author Name",
    date: "4/12/19",
    archiveUrl: "food.html",
    body: [
      "Mint tea, warm msemen, olives, and the patient rhythm of a morning market before the heat arrives.",
      "Breakfast in Marrakesh felt less like a meal than a small negotiation with the day: sweet, salty, hot, soft, and always a little brighter than expected.",
      "I learned to arrive early, sit where I could watch the bread being folded, and let the first glass of tea slow everything down."
    ],
  },
  "cairo-koshary": {
    category: "Food",
    title: "A Bowl of Koshary in Cairo",
    author: "Guest User",
    date: "3/19/19",
    archiveUrl: "food.html",
    body: [
      "Rice, lentils, pasta, onions, and sauce, eaten standing at a counter while the city keeps moving outside.",
      "Koshary is generous food. It is built from humble ingredients, but the bowl arrives with enough texture and heat to feel complete.",
      "The best version I had was not elegant. It was fast, crowded, loud, and exactly what I needed."
    ],
  },
  "bangkok-night-market": {
    category: "Food",
    title: "Bangkok Night Market Notes",
    author: "Author Name",
    date: "2/3/19",
    archiveUrl: "food.html",
    body: [
      "Smoke, fruit, noodles, and the small decisions that become a perfect dinner after a long walking day.",
      "Night markets are best approached without a plan. Start with something cold, follow the longest line only if it smells convincing, and leave room for the thing you did not know to want.",
      "My favorite dinners there were assembled slowly, one stall at a time."
    ],
  },
  "bhutan-tea": {
    category: "Food",
    title: "Butter Tea in Bhutan",
    author: "Author Name",
    date: "1/18/19",
    archiveUrl: "food.html",
    body: [
      "Salty, warm, unfamiliar at first, and eventually inseparable from cold mornings in the mountains.",
      "Butter tea confused me until I stopped expecting it to behave like the tea I knew. It was closer to broth, comfort, and weather protection.",
      "By the end of the week, I understood why the cup kept returning to my hands."
    ],
  },
  "bamako-rice": {
    category: "Food",
    title: "Rice and Sauce in Bamako",
    author: "Author Name",
    date: "12/8/18",
    archiveUrl: "food.html",
    body: [
      "A courtyard lunch, one shared bowl, and the reminder that simple food can carry the whole mood of an afternoon.",
      "The rice was not precious. That was the point. It was everyday food made with care, passed around without ceremony, and eaten while conversation moved in several directions at once.",
      "Some meals become memorable because nothing about them is trying too hard."
    ],
  },
  "algeria-flatbread": {
    category: "Food",
    title: "Flatbread in the Djebel Babor",
    author: "Author Name",
    date: "11/22/18",
    archiveUrl: "food.html",
    body: [
      "Bread cooked close to the fire, torn by hand, and eaten with soup after the mountain air turned cold.",
      "I remember the sound first: the bread being moved, the fire shifting, the room settling into the kind of quiet that only arrives after a long day outside.",
      "It was not a complicated meal, but it felt complete in the way mountain meals often do."
    ],
  },
  "greece-may-table": {
    category: "Food",
    title: "A May Day Table in Greece",
    author: "Guest User",
    date: "10/17/18",
    archiveUrl: "food.html",
    body: [
      "Greens, fish, bread, and wine stretched across an afternoon where every plate seemed to arrive with a story.",
      "The table was less about courses than continuity. Someone was always standing up, pouring more wine, moving bread, or explaining why this particular dish mattered.",
      "By evening I understood that the meal had been the celebration all along."
    ],
  },
};

function applyPaletteFromHash() {
  const hash = window.location.hash;

  if (!hash.startsWith("#colors:")) {
    return;
  }

  const pairs = hash.replace("#colors:", "").split(";");

  pairs.forEach((pair) => {
    const [key, rawValue] = pair.split("=");
    const variable = colorMap[key];

    if (!variable || !rawValue) {
      return;
    }

    const [h, s, l] = rawValue.split(",").map(Number);

    if ([h, s, l].some((value) => Number.isNaN(value))) {
      return;
    }

    root.style.setProperty(variable, `hsl(${h} ${s}% ${l}%)`);
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#siteNav");

  if (!toggle || !nav) {
    return;
  }

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

function setupPostFilters() {
  const search = document.querySelector("#postSearch");
  const posts = [...document.querySelectorAll(".post-entry")];
  const emptyState = document.querySelector("#emptyState");

  if (!search || !posts.length || !emptyState) {
    return;
  }

  function filterPosts() {
    const searchTerm = search.value.trim().toLowerCase();
    let visibleCount = 0;

    posts.forEach((post) => {
      const matchesSearch = post.textContent.toLowerCase().includes(searchTerm);

      post.classList.toggle("is-hidden", !matchesSearch);

      if (matchesSearch) {
        visibleCount += 1;
      }
    });

    emptyState.hidden = visibleCount !== 0;
  }

  search.addEventListener("input", filterPosts);
  filterPosts();
}

function setupPostPage() {
  const postPage = document.querySelector("#postPage");
  const postMissing = document.querySelector("#postMissing");
  const title = document.querySelector("#postTitle");
  const category = document.querySelector("#postCategory");
  const meta = document.querySelector("#postMeta");
  const body = document.querySelector("#postBody");
  const archiveLink = document.querySelector("#postArchiveLink");

  if (!postPage || !postMissing || !title || !category || !meta || !body || !archiveLink) {
    return;
  }

  const slug = new URLSearchParams(window.location.search).get("post");
  const post = slug ? posts[slug] : undefined;

  if (!post) {
    postPage.hidden = true;
    postMissing.hidden = false;
    document.title = "Post Not Found | Cassidy Harman";
    return;
  }

  document.title = `${post.title} | Cassidy Harman`;
  category.textContent = post.category;
  title.textContent = post.title;
  meta.textContent = `${post.author} ${post.date}`;
  body.innerHTML = post.body.map((paragraph) => `<p>${paragraph}</p>`).join("");
  archiveLink.href = post.archiveUrl;
  archiveLink.textContent = `Back to ${post.category.toLowerCase()} archive`;
}

function setupNewsletterForm() {
  const form = document.querySelector("#newsletterForm");
  const email = document.querySelector("#email");
  const message = document.querySelector("#formMessage");

  if (!form || !email || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    if (!email.validity.valid) {
      event.preventDefault();
      message.textContent = "Please enter a valid email address.";
      email.focus();
      return;
    }

    const recipientToken = form.dataset.signupRecipientToken?.trim();

    if (!recipientToken) {
      event.preventDefault();
      message.textContent = "Newsletter signup is not connected yet.";
      return;
    }

    try {
      const recipient = window.atob(recipientToken).trim();
      form.action = `https://formsubmit.co/${recipient}`;
    } catch {
      event.preventDefault();
      message.textContent = "Newsletter signup is not connected yet.";
      return;
    }

    message.textContent = "Submitting...";
  });
}

function setupRevealAnimations() {
  const revealElements = [...document.querySelectorAll("[data-reveal]")];

  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

applyPaletteFromHash();
setupMobileNavigation();
setupPostFilters();
setupPostPage();
setupNewsletterForm();
setupRevealAnimations();
