import "./top-breadcrumb.scss";

interface topBreadCrumbProps {
  title: string;
  handleBack: () => void;
}

const TopBreadcrumb = (props: topBreadCrumbProps) => {
  return (
    <div className="top-breadcrumb-container">
      <img src="/assets/icons/back-arrow.svg" onClick={props.handleBack} />
      <span className="bold-text-medium-xxs">{props.title}</span>
    </div>
  );
};

export default TopBreadcrumb;
