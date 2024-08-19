import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';  
import { addOneQuery } from '../../models/queries'; // Import de la fonction addOneQuery

const NewPage = () => {
  clearPage();
  barreDeRecherche();
};

function barreDeRecherche() {
  const main = document.querySelector('main');
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter your query subject';
  input.className = 'form-control';
  main.appendChild(input);
  
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.className = 'btn btn-primary';
  main.appendChild(submitButton);

  submitButton.addEventListener('click', async () => {
    const subject = input.value;

    if (subject) {
      try {
        const newQuery = await addOneQuery({ subject, status: 'requested' }); // Utilisation de la fonction addOneQuery pour envoyer la query au backend
        console.log('Query created successfully:', newQuery);
        Navigate('/manage'); // Redirection vers la page de gestion après succès
      } catch (err) {
        console.error('Failed to create query:', err);
        alert('Failed to create query');
      }
    } else {
      alert('Please enter a subject for the query.');
    }
  });
}

export default NewPage;
