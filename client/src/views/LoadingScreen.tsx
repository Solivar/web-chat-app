import FullHeightLayout from '../layouts/FullHeightLayout';

export default function LoadingScreen() {
  return (
    <FullHeightLayout>
      <div className="block">
        <div
          className="loader-big mx-auto mb-5"
          aria-label="Currently loading"
        ></div>
        <p>Connecting to server</p>
      </div>
    </FullHeightLayout>
  );
}
