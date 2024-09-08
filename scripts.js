// scripts.js

let experienceCount = 1;
let educationCount = 1;

function addField(type) {
    if (type === 'experience') {
        const container = document.getElementById('experience-container');
        const newField = document.createElement('div');
        newField.className = 'field-group mb-3 animate__animated animate__fadeIn';
        newField.innerHTML = `
            <div class="row">
                <div class="col-12 col-md-6 mb-2">
                    <input type="text" class="form-control" id="company-${experienceCount}" placeholder="Company Name" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <input type="text" class="form-control" id="profile-${experienceCount}" placeholder="Profile/Designation" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <input type="text" class="form-control" id="date-range-${experienceCount}" placeholder="Date Range (e.g. Jan 2020 - Dec 2022)" required>
                </div>
                <div class="col-12 mb-2">
                    <textarea class="form-control" id="description-${experienceCount}" rows="3" placeholder="Describe your work..." required></textarea>
                </div>
                <div class="col-12 mt-2">
                    <button class="btn btn-outline-secondary remove-field" type="button" onclick="removeField(this)">-</button>
                </div>
            </div>
        `;
        container.appendChild(newField);
        experienceCount++;
    } else if (type === 'education') {
        const container = document.getElementById('education-container');
        const newField = document.createElement('div');
        newField.className = 'field-group mb-3 animate__animated animate__fadeIn';
        newField.innerHTML = `
            <div class="row">
                <div class="col-12 col-md-6 mb-2">
                    <input type="text" class="form-control" id="degree-${educationCount}" placeholder="Degree (e.g. Bachelor of Science)" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <input type="text" class="form-control" id="institution-${educationCount}" placeholder="Institution Name" required>
                </div>
                <div class="col-12 col-md-6 mb-2">
                    <input type="text" class="form-control" id="edu-date-range-${educationCount}" placeholder="Date Range (e.g. Sep 2015 - Jun 2019)" required>
                </div>
                <div class="col-12 mb-2">
                    <textarea class="form-control" id="edu-description-${educationCount}" rows="3" placeholder="Describe your education..." required></textarea>
                </div>
                <div class="col-12 mt-2">
                    <button class="btn btn-outline-secondary remove-field" type="button" onclick="removeField(this)">-</button>
                </div>
            </div>
        `;
        container.appendChild(newField);
        educationCount++;
    }
}

function removeField(button) {
    button.parentElement.parentElement.remove();
}

function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    let experienceHTML = '';
    let educationHTML = '';

    for (let i = 0; i < experienceCount; i++) {
        const company = document.getElementById(`company-${i}`);
        const profile = document.getElementById(`profile-${i}`);
        const dateRange = document.getElementById(`date-range-${i}`);
        const description = document.getElementById(`description-${i}`);
        if (company && profile && dateRange && description) {
            experienceHTML += `
                <div class="mb-4 p-3 border rounded shadow-sm">
                    <h4 class="text-primary">${company.value}</h4>
                    <p><strong>Profile:</strong> ${profile.value}</p>
                    <p><strong>Date Range:</strong> ${dateRange.value}</p>
                    <p>${description.value}</p>
                </div>
            `;
        }
    }

    for (let i = 0; i < educationCount; i++) {
        const degree = document.getElementById(`degree-${i}`);
        const institution = document.getElementById(`institution-${i}`);
        const eduDateRange = document.getElementById(`edu-date-range-${i}`);
        const eduDescription = document.getElementById(`edu-description-${i}`);
        if (degree && institution && eduDateRange && eduDescription) {
            educationHTML += `
                <div class="mb-4 p-3 border rounded shadow-sm">
                    <h4 class="text-success">${degree.value}</h4>
                    <p><strong>Institution:</strong> ${institution.value}</p>
                    <p><strong>Date Range:</strong> ${eduDateRange.value}</p>
                    <p>${eduDescription.value}</p>
                </div>
            `;
        }
    }

    const skills = document.getElementById('skills').value;
    const certifications = document.getElementById('certifications').value;
    const projects = document.getElementById('projects').value;
    const languages = document.getElementById('languages').value;

    const resumeHTML = `
        <div class="container">
            <h2 class="text-primary">${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3 class="text-info">Experience</h3>
            ${experienceHTML}
            <h3 class="text-info">Education</h3>
            ${educationHTML}
            <h3 class="text-info">Skills</h3>
            <p>${skills}</p>
            <h3 class="text-info">Certifications</h3>
            <p>${certifications}</p>
            <h3 class="text-info">Projects</h3>
            <p>${projects}</p>
            <h3 class="text-info">Languages</h3>
            <p>${languages}</p>
        </div>
    `;

    document.getElementById('resume-preview').innerHTML = resumeHTML;
    document.getElementById('resume-preview').style.display = 'block';
}

// PDF Download
document.getElementById('download-pdf').addEventListener('click', function() {
    const element = document.getElementById('resume-preview');
    const options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
});

// DOCX Download
document.getElementById('download-doc').addEventListener('click', function() {
    const doc = new Docxtemplater();
    const zip = new JSZip();
    const content = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                h2 { color: #007bff; }
                h3 { color: #28a745; }
                h4 { color: #17a2b8; }
                p { font-size: 16px; }
                .border { border: 1px solid #dee2e6; }
                .rounded { border-radius: 0.75rem; }
                .shadow-sm { box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); }
            </style>
        </head>
        <body>
            <h2>${document.getElementById('name').value}</h2>
            <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
            <p><strong>Phone:</strong> ${document.getElementById('phone').value}</p>
            <h3>Experience</h3>
            ${document.querySelectorAll('#experience-container .field-group').map(field => `
                <div>
                    <h4>${field.querySelector('input[id^="company"]').value}</h4>
                    <p><strong>Profile:</strong> ${field.querySelector('input[id^="profile"]').value}</p>
                    <p><strong>Date Range:</strong> ${field.querySelector('input[id^="date-range"]').value}</p>
                    <p>${field.querySelector('textarea[id^="description"]').value}</p>
                </div>
            `).join('')}
            <h3>Education</h3>
            ${document.querySelectorAll('#education-container .field-group').map(field => `
                <div>
                    <h4>${field.querySelector('input[id^="degree"]').value}</h4>
                    <p><strong>Institution:</strong> ${field.querySelector('input[id^="institution"]').value}</p>
                    <p><strong>Date Range:</strong> ${field.querySelector('input[id^="edu-date-range"]').value}</p>
                    <p>${field.querySelector('textarea[id^="edu-description"]').value}</p>
                </div>
            `).join('')}
            <h3>Skills</h3>
            <p>${document.getElementById('skills').value}</p>
            <h3>Certifications</h3>
            <p>${document.getElementById('certifications').value}</p>
            <h3>Projects</h3>
            <p>${document.getElementById('projects').value}</p>
            <h3>Languages</h3>
            <p>${document.getElementById('languages').value}</p>
        </body>
        </html>
    `;
    zip.file('resume.docx', content);
    zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, 'resume.docx');
    });
});
