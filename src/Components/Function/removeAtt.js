

const removeAttribute = () => {
    let md = document.querySelectorAll("#modalLoan");
    md.forEach((atribute) => {
      atribute.removeAttribute("data-bs-target");
    });
}

export { removeAttribute }