
import { clearPage } from '../../utils/render';

const CreateQuery = () => {
  clearPage();
  formRender();
};

function formRender() {
  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const form = document.createElement('div'); // Changé de "from" à "form"
    form.innerHTML = `
      <div class="container mt-5">
        <form>
          <div class="mb-3">
            <label for="exampleInputText" class="form-label">Subject of your query</label>
            <input type="text" class="form-control" id="exampleInputText" placeholder="Enter text">
          </div>
          
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Test checkbox</label>
          </div>
          
          <button type="button" class="btn btn-primary" id="btn">Submit</button>
        </form>
      </div>
    `;
    const submit = document.getElementById("btn");
    submit.addEventListener('click', () => {
      const textValue = document.getElementById('exampleInputText').value;
      const checkboxChecked = document.getElementById('exampleCheck1').checked;

      // Créer un objet avec les données du formulaire
      const formData = {
        textValue,
        checkboxChecked
      };

      // Effectuer une requête POST vers le backend
      fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        // Traitement de la réponse du backend si nécessaire
        console.log('Réponse du backend:', data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête vers le backend:', error);
      });
    });

    main.appendChild(form); // Changé de "submit" à "form"
  });
}

export default CreateQuery;
