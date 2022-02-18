let template = null;

let update = function (templateName) {
    return function() {
        template = templateName;
        fetch(`/templates/${templateName}.html`)
            .then(response => response.text())
            .then(function (text) {
                if(templateName == template) {
                    document.getElementById("content").innerHTML = text;
                }
            })
            .finally(function() {
                router.updatePageLinks();
            });
    }
}

let router = new Navigo(`${window.location.origin}/`);
router
    .on("/", update("index"))
    .on("/tech", update("tech"))
    .on("/projects", update("projects"))
    .on("/contact", update("contact"))
    .on("/news", update("news"))
    .on("/news_page2", update("news_page2"))
    .on("/products", update("products"))
    .notFound(update("404"));

document.addEventListener("DOMContentLoaded", function (event) {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    // github pages 404 hack
    const p = urlParams.get("p")
    if(p) {
        router.navigate(p);
    }
    router.resolve();
    router.updatePageLinks();
})