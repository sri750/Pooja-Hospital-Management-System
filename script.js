// ========================================
// HOSPITAL MANAGEMENT SYSTEM
// ========================================


// DEFAULT DATA

let patients = JSON.parse(
    localStorage.getItem("hospitalPatients")
) || [
    {
        id: "P1001",
        name: "Arun Kumar",
        age: 35,
        gender: "Male",
        phone: "9876543210",
        disease: "Fever"
    },
    {
        id: "P1002",
        name: "Priya Devi",
        age: 28,
        gender: "Female",
        phone: "9876501234",
        disease: "Migraine"
    }
];


let doctors = JSON.parse(
    localStorage.getItem("hospitalDoctors")
) || [
    {
        name: "Dr. Anitha",
        specialization: "Cardiologist",
        department: "Cardiology",
        time: "9:00 AM - 2:00 PM"
    },
    {
        name: "Dr. Rajesh",
        specialization: "Neurologist",
        department: "Neurology",
        time: "10:00 AM - 4:00 PM"
    },
    {
        name: "Dr. Meena",
        specialization: "Pediatrician",
        department: "Pediatrics",
        time: "9:00 AM - 1:00 PM"
    }
];


let appointments = JSON.parse(
    localStorage.getItem("hospitalAppointments")
) || [
    {
        patient: "Arun Kumar",
        doctor: "Dr. Anitha",
        date: "2026-08-26",
        time: "10:00",
        status: "Confirmed"
    },
    {
        patient: "Priya Devi",
        doctor: "Dr. Rajesh",
        date: "2026-08-27",
        time: "11:30",
        status: "Pending"
    }
];


// SAVE DATA

function saveData() {

    localStorage.setItem(
        "hospitalPatients",
        JSON.stringify(patients)
    );

    localStorage.setItem(
        "hospitalDoctors",
        JSON.stringify(doctors)
    );

    localStorage.setItem(
        "hospitalAppointments",
        JSON.stringify(appointments)
    );
}


// CURRENT DATE

function displayDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("currentDate").innerText =
        today.toLocaleDateString("en-IN", options);
}


// DASHBOARD COUNTS

function updateCounts() {

    document.getElementById("patientCount").innerText =
        patients.length;

    document.getElementById("doctorCount").innerText =
        doctors.length;

    document.getElementById("appointmentCount").innerText =
        appointments.length;

    const occupiedBeds = patients.length;

    const availableBeds =
        Math.max(0, 24 - occupiedBeds);

    document.getElementById("bedCount").innerText =
        availableBeds;
}


// MODAL

function openModal(id) {

    document.getElementById(id).classList.add("show");
}


function closeModal(id) {

    document.getElementById(id).classList.remove("show");
}


// ========================================
// PATIENTS
// ========================================

function renderPatients(list = patients) {

    const table =
        document.getElementById("patientTable");

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    No patients found.
                </td>
            </tr>
        `;

        return;
    }


    list.forEach((patient, index) => {

        table.innerHTML += `

            <tr>

                <td>
                    <strong>${patient.id}</strong>
                </td>

                <td>${patient.name}</td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${patient.phone}</td>

                <td>${patient.disease}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deletePatient(${index})"
                    >
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


// ADD PATIENT

document
    .getElementById("patientForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const newPatient = {

            id:
                "P" +
                Math.floor(
                    1000 + Math.random() * 9000
                ),

            name:
                document.getElementById(
                    "patientName"
                ).value,

            age:
                document.getElementById(
                    "patientAge"
                ).value,

            gender:
                document.getElementById(
                    "patientGender"
                ).value,

            phone:
                document.getElementById(
                    "patientPhone"
                ).value,

            disease:
                document.getElementById(
                    "patientDisease"
                ).value
        };


        patients.push(newPatient);

        saveData();

        renderPatients();

        updateCounts();

        this.reset();

        closeModal("patientModal");

        alert("Patient added successfully!");
    });


// DELETE PATIENT

function deletePatient(index) {

    if (
        confirm(
            "Are you sure you want to delete this patient?"
        )
    ) {

        patients.splice(index, 1);

        saveData();

        renderPatients();

        updateCounts();
    }
}


// SEARCH PATIENT

function searchPatients() {

    const value =
        document
            .getElementById("patientSearch")
            .value
            .toLowerCase();


    const filtered =
        patients.filter(patient =>
            patient.name
                .toLowerCase()
                .includes(value)
            ||
            patient.id
                .toLowerCase()
                .includes(value)
        );


    renderPatients(filtered);
}


// ========================================
// DOCTORS
// ========================================

function renderDoctors() {

    const grid =
        document.getElementById("doctorGrid");

    grid.innerHTML = "";


    doctors.forEach((doctor, index) => {

        const initials =
            doctor.name
                .replace("Dr.", "")
                .trim()
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


        grid.innerHTML += `

            <div class="doctor-card">

                <div class="doctor-avatar">
                    ${initials}
                </div>

                <h3>${doctor.name}</h3>

                <p>
                    ${doctor.specialization}
                </p>

                <div class="doctor-info">

                    <p>
                        <strong>Department:</strong>
                        ${doctor.department}
                    </p>

                    <p>
                        <strong>Available:</strong>
                        ${doctor.time}
                    </p>

                </div>

                <br>

                <button
                    class="delete-btn"
                    onclick="deleteDoctor(${index})"
                >
                    Delete
                </button>

            </div>
        `;
    });
}


// ADD DOCTOR

document
    .getElementById("doctorForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        doctors.push({

            name:
                document.getElementById(
                    "doctorName"
                ).value,

            specialization:
                document.getElementById(
                    "doctorSpecialization"
                ).value,

            department:
                document.getElementById(
                    "doctorDepartment"
                ).value,

            time:
                document.getElementById(
                    "doctorTime"
                ).value

        });


        saveData();

        renderDoctors();

        updateCounts();

        this.reset();

        closeModal("doctorModal");

        alert("Doctor added successfully!");
    });


// DELETE DOCTOR

function deleteDoctor(index) {

    if (
        confirm(
            "Are you sure you want to delete this doctor?"
        )
    ) {

        doctors.splice(index, 1);

        saveData();

        renderDoctors();

        updateCounts();
    }
}


// ========================================
// APPOINTMENTS
// ========================================

function getStatusClass(status) {

    return status
        .toLowerCase()
        .replace(" ", "");
}


function renderAppointments() {

    const table =
        document.getElementById(
            "appointmentTable"
        );

    const dashboardTable =
        document.getElementById(
            "dashboardAppointments"
        );


    table.innerHTML = "";

    dashboardTable.innerHTML = "";


    appointments.forEach(
        (appointment, index) => {

            const statusClass =
                getStatusClass(
                    appointment.status
                );


            table.innerHTML += `

                <tr>

                    <td>${appointment.patient}</td>

                    <td>${appointment.doctor}</td>

                    <td>${appointment.date}</td>

                    <td>${appointment.time}</td>

                    <td>
                        <span
                            class="status ${statusClass}"
                        >
                            ${appointment.status}
                        </span>
                    </td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteAppointment(${index})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;


            if (index < 5) {

                dashboardTable.innerHTML += `

                    <tr>

                        <td>
                            ${appointment.patient}
                        </td>

                        <td>
                            ${appointment.doctor}
                        </td>

                        <td>
                            ${appointment.date}
                        </td>

                        <td>
                            ${appointment.time}
                        </td>

                        <td>

                            <span
                                class="status ${statusClass}"
                            >
                                ${appointment.status}
                            </span>

                        </td>

                    </tr>
                `;
            }

        }
    );


    if (appointments.length === 0) {

        dashboardTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty"
                >
                    No appointments found.
                </td>

            </tr>
        `;
    }
}


// ADD APPOINTMENT

document
    .getElementById("appointmentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        appointments.push({

            patient:
                document.getElementById(
                    "appointmentPatient"
                ).value,

            doctor:
                document.getElementById(
                    "appointmentDoctor"
                ).value,

            date:
                document.getElementById(
                    "appointmentDate"
                ).value,

            time:
                document.getElementById(
                    "appointmentTime"
                ).value,

            status:
                document.getElementById(
                    "appointmentStatus"
                ).value
        });


        saveData();

        renderAppointments();

        updateCounts();

        this.reset();

        closeModal("appointmentModal");

        alert(
            "Appointment booked successfully!"
        );
    });


// DELETE APPOINTMENT

function deleteAppointment(index) {

    if (
        confirm(
            "Delete this appointment?"
        )
    ) {

        appointments.splice(index, 1);

        saveData();

        renderAppointments();

        updateCounts();
    }
}


// ========================================
// BILLING
// ========================================

function generateBill() {

    const patient =
        document.getElementById(
            "billPatient"
        ).value.trim();


    const consultation =
        Number(
            document.getElementById(
                "consultation"
            ).value
        ) || 0;


    const medicine =
        Number(
            document.getElementById(
                "medicine"
            ).value
        ) || 0;


    const room =
        Number(
            document.getElementById(
                "room"
            ).value
        ) || 0;


    if (patient === "") {

        alert(
            "Please enter patient name."
        );

        return;
    }


    const total =
        consultation +
        medicine +
        room;


    document.getElementById(
        "billDetails"
    ).innerHTML = `

        <div class="bill-line">

            <span>Patient</span>

            <strong>
                ${patient}
            </strong>

        </div>


        <div class="bill-line">

            <span>Consultation</span>

            <strong>
                ₹${consultation.toLocaleString("en-IN")}
            </strong>

        </div>


        <div class="bill-line">

            <span>Medicine</span>

            <strong>
                ₹${medicine.toLocaleString("en-IN")}
            </strong>

        </div>


        <div class="bill-line">

            <span>Room Charges</span>

            <strong>
                ₹${room.toLocaleString("en-IN")}
            </strong>

        </div>


        <div class="bill-total">

            <span>Total</span>

            <span>
                ₹${total.toLocaleString("en-IN")}
            </span>

        </div>
    `;
}


function showBilling() {

    scrollToSection("billing");
}


// ========================================
// NAVIGATION
// ========================================

function scrollToSection(id) {

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });
}


// UPDATE PAGE TITLE

const sections =
    document.querySelectorAll(
        ".page-section"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    function() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );
            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute(
                    "href"
                ) === "#" + current
            ) {

                link.classList.add(
                    "active"
                );
            }

        });


        const titleMap = {

            dashboard: "Dashboard",

            patients:
                "Patient Management",

            doctors:
                "Doctor Management",

            appointments:
                "Appointments",

            billing:
                "Billing Management"
        };


        if (titleMap[current]) {

            document.getElementById(
                "pageTitle"
            ).innerText =
                titleMap[current];
        }

    }
);


// NOTIFICATION

function showNotification() {

    alert(
        "You have new hospital notifications."
    );
}


// LOGOUT

function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        alert(
            "Logout successful!"
        );
    }
}


// INITIALIZE

displayDate();

renderPatients();

renderDoctors();

renderAppointments();

updateCounts();