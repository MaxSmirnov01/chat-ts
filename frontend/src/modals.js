import AddModal from './components/modals/AddModal';
import RemoveModal from './components/modals/RemoveModal';
import RenameModal from './components/modals/RenameModal';

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
