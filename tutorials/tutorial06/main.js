// global variables tracking the user's preferences:
let searchTerm = "";
let openOnly = false;

const search = (ev) => {
    ev.preventDefault(); // overrides default button action

    // Set user's preferences (global variables) from the DOM:
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;

    // Invoke the show matching courses function
    showMatchingCourses();
};

// Part 1.1a
const isClassFull = (course) => {
    // modify this to accurately apply the filter:
    return (course.EnrollmentCurrent >= course.EnrollmentMax);
};

// Part 1.1b
const doesTermMatch = (course) => {
    // modify this to accurately apply the filter:
    let upperTerm = searchTerm.toUpperCase();

    if (String(course.CRN).includes(upperTerm)) {
        return true;
    } else if (course.Code.toUpperCase().includes(upperTerm)) {
        return true;
    } else if (course.Title.includes(upperTerm)) {
        return true;
    }
    return false;
};

// Part 1.2
const dataToHTML = (course) => {
    // modify this to be more detailed
    const instructors = Array.isArray(course.Instructors) 
        ? course.Instructors.map(inst => inst.Name).join(", ") 
        : course.Instructors?.Name || "Instructor Unavailable";
    const loc = Array.isArray(course.Location) 
        ? course.Location.map(inst => inst.FullLocation).join(", ") 
        : course.Location?.FullLocation || "Location Unavailable";

    return `
    <section class="course">
        <h2>${course.Title}</h2>
        <p>
            <i class="fa-solid fa-circle-check"></i>
            Open &bull; ${course.CRN} &bull; Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}
        </p>
        <p>
            ${course.Days} &bull; ${loc} &bull; ${course.Hours} credit hour(s)
        </p>
        <p><strong>${instructors}</strong></p>
    </section>
    `
};

// Part 2
const showMatchingCourses = () => {
    console.log(`Search term: ${searchTerm}`);
    console.log(`Only show open classes: ${openOnly}`);
    console.log(`Course data:`, courseList);

    // output all of the matching courses to the screen:
    const container = document.querySelector(".courses");
    container.innerHTML = null;
    let matches = courseList.filter(doesTermMatch);
    matches.forEach((course) => {
        const snippet = dataToHTML(course);
        container.insertAdjacentHTML('beforeend', snippet);
    });
};
