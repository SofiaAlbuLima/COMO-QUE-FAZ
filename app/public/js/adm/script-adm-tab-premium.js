const tabs = document.querySelectorAll('.adm-tab-btn-premium');

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
    const contents = document.querySelectorAll('.adm-content-premium');

    contents.forEach(content => content.classList.remove('show'));

    const contentid = tab.getAttribute('content-id');
    const content = document.getElementById(contentid);
    content.classList.add('show');
}