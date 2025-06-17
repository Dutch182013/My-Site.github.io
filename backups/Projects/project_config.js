class Project_Config {
    constructor() {
        this.project_config_ID = document.getElementById("project_configs");

    }
    pack_data(href, title) {
        return `<center><span class="typing-2"></span><a href="${href}">${title}</a></center>`
    }
    load_list() {
        let text_list = ""
        let text_href = (project_url) => {
            return `${project_url}/index.html`;
        }
        let text_title = (project_name) => {
            return project_name;
        }
        fetch("list.json")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    text_list += this.pack_data(text_href(data[i].url), text_title(data[i].name));
                }
                this.project_config_ID.innerHTML = text_list;
            })
            .catch(error => console.error('Error loading project configs:', error));
    }
}

projectConfig = new Project_Config();
projectConfig.load_list();