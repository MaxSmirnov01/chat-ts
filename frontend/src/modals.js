import AddModal from './components/AddModal';
import RemoveModal from './components/RemoveModal';
import RenameModal from './components/RenameModal';

const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
};

export default (modalName) => {
  if (!modals[modalName]) {
    return null;
  }
  return modals[modalName];
};
