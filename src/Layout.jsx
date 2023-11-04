import PropTypes from 'prop-types';
import Header from './component/Header';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-6 ">
      <div className="w-[1200px]">
        <Header />
        {children}
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
