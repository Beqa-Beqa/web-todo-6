import { Footer, MessagingWindow, NavbarLoggedIn } from "../containers";

// Homepage for authorized users
const HomepageLoggedIn = () => {
  return (
    <div className="homepage-logged-in">
      <header>
        <NavbarLoggedIn />
      </header>
      <main className="d-flex align-center justify-center mt-5">
        <MessagingWindow />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomepageLoggedIn;