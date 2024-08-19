
import { clearPage } from '../../utils/render';

const ManegeQuery = () => {
  clearPage();
  getList();
};

function afficherList(query) {
    const main = document.querySelector('main');
    const list = document.createElement('ul');
    list.className = "list-group";
    list.innerHTML = `
      <li class="list-group-item">
        <div class="d-flex justify-content-between">
          <span>${query.subject}</span>
          <select class="form-select" aria-label="Default select example">
            <option selected>${query.status}</option>
            <option value="requested">Requested</option>
            <option value="accepted">Accepted</option>
            <option value="refused">Refused</option>
            <option value="done">Done</option>
          </select>
        </div>
      </li>
    `;
    main.appendChild(list);
  }
  
  function getList() {
    fetch('http://localhost:3000/queries')
      .then(response => response.json())
      .then(data => {
        // Appeler la fonction afficherList pour chaque élément dans la liste
        data.forEach(query => {
          afficherList(query);
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la liste depuis le backend:', error);
      });
  }

export default ManegeQuery;
