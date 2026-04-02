interface Job {
    id: number;
    title: string;
    company: string;
    salary: string;
    location: string;
    role: string;
    logo: string;
}

const jobs: Job[] = [
{
    id:1,
    title:"Frontend Developer",
    company:"Google",
    salary:"₹10 LPA",
    location:"Bangalore",
    role:"Developer",
    logo:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
    id:2,
    title:"UI Designer",
    company:"Adobe",
    salary:"₹8 LPA",
    location:"Chennai",
    role:"Designer",
    logo:"https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg"
    },
    {
    id:3,
    title:"Backend Developer",
    company:"Amazon",
    salary:"₹12 LPA",
    location:"Hyderabad",
    role:"Developer",
    logo:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    },
    {
    id:4,
    title:"Software Engineer",
    company:"Microsoft",
    salary:"₹11 LPA",
    location:"Noida",
    role:"Developer",
    logo:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
    },
    {
    id:5,
    title:"Data Analyst",
    company:"Infosys",
    salary:"₹6 LPA",
    location:"Pune",
    role:"Developer",
    logo:"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"
    }
];

let savedJobs: Job[] = [];

const jobContainer = document.getElementById("jobContainer")!;
const savedContainer = document.getElementById("savedContainer")!;
const searchInput = document.getElementById("search") as HTMLInputElement;
const companyFilter = document.getElementById("companyFilter") as HTMLSelectElement;
const roleFilter = document.getElementById("roleFilter") as HTMLSelectElement;

/* Render Jobs */
function renderJobs(jobList: Job[]) {
    jobContainer.innerHTML = "";

    jobList.forEach(job => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${job.logo}" class="logo"/>
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>${job.salary}</p>
            <p>${job.location}</p>
            <button onclick="saveJob(${job.id})">Save</button>
        `;

        jobContainer.appendChild(card);
    });
}

/* Render Saved Jobs */
function renderSavedJobs() {
    savedContainer.innerHTML = "";

    savedJobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company}</p>
        `;

        savedContainer.appendChild(card);
    });
}

/* Save Job */
(window as any).saveJob = function(id: number) {
    const job = jobs.find(j => j.id === id);
    if (job && !savedJobs.includes(job)) {
        savedJobs.push(job);
        renderSavedJobs();
    }
}

/* Filters */
function applyFilters() {
    let filtered = jobs;

    const search = searchInput.value.toLowerCase();
    const company = companyFilter.value;
    const role = roleFilter.value;

    filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search)
    );

    if (company) {
        filtered = filtered.filter(job => job.company === company);
    }

    if (role) {
        filtered = filtered.filter(job => job.role === role);
    }

    renderJobs(filtered);
}

/* Populate Company Dropdown */
function loadCompanies() {
    const companies = [...new Set(jobs.map(j => j.company))];

    companies.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        companyFilter.appendChild(option);
    });
}

/* Event Listeners */
searchInput.addEventListener("input", applyFilters);
companyFilter.addEventListener("change", applyFilters);
roleFilter.addEventListener("change", applyFilters);

/* Init */
loadCompanies();
renderJobs(jobs);
