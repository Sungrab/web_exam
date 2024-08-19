import { clearPage } from '../../utils/render';
import { getAllQueries } from '../../models/queries'; // Import de la fonction getAllQueries

const ManagePage = async () => {
  clearPage();
  await afficherDemandes();
};

async function afficherDemandes() {
  const main = document.querySelector('main');
  
  try {
    const queries = await getAllQueries(); // Utilisation de la fonction getAllQueries pour récupérer toutes les queries depuis le backend
    
    const list = document.createElement('ul');
    
    queries.forEach(query => {
      const listItem = document.createElement('li');
      const select = document.createElement('select');

      // Créer un dropdown pour les statuts
      ['requested', 'accepted', 'refused', 'done'].forEach(status => {
        const option = document.createElement('option');
        option.value = status;
        option.text = status;
        if (query.status === status) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      listItem.textContent = query.subject;
      listItem.appendChild(select);
      list.appendChild(listItem);
      
      select.addEventListener('change', async (e) => {
        const newStatus = e.target.value;
        console.log(`Updating query ${query.id} to ${newStatus}`);
        // Appel pour mettre à jour le statut dans le backend (si requis)
      });
    });
    
    main.appendChild(list);
  } catch (error) {
    console.error('Failed to fetch queries', error);
    alert('Failed to load queries');
  }
}

export default ManagePage;
