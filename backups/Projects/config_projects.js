class Project_Config {
    constructor() {
        this.project_config_ID = document.getElementById("project_configs");

    }
    text_href(project_url) {
        return `${project_url}/index.html`;
    }
    text_title(project_name) {
        return project_name;
    }
    pack_data(href, title) {
        return `<center><span class="typing-2"></span><a href="${href}">${title}</a></center>`
    }
    load_list(list_json="list.json", path_prefix="") {
        let text_list = ""
        fetch(`${path_prefix}${list_json}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    text_list += this.pack_data(this.text_href(`${path_prefix}${data[i].url}`), this.text_title(data[i].name));
                }
                this.project_config_ID.innerHTML = text_list;
            })
            .catch(error => console.error('Error loading project configs:', error));
    }
}

