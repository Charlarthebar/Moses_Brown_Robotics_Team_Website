import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function Game() {
  return (
    <PageTransition>
      <Helmet>
        <title>The Game - MB Robotics</title>
        <meta name="description" content="VEX Robotics High Stakes game information - Moses Brown Robotics Team 1784" />
        <meta property="og:title" content="The Game - MB Robotics" />
        <meta property="og:description" content="Learn about this year's VEX Robotics game: High Stakes." />
        <meta property="og:image" content="/images/HighStakesGame.webp" />
      </Helmet>

      <section className="page-header section-accent">
        <h1>The Game</h1>
        <span className="section-label">VEX Robotics</span>
        <p className="page-subtitle">Having Fun with Engineering</p>
      </section>

      <section className="section section-accent">
        <div className="section-container">
          <div className="content-row">
            <div className="content-text">
              <p>
                There is a new game every year that uses different objects and has new objectives.
                In preparation for the game, teams build robots to compete in various challenges that require
                the robots to perform specific tasks. The competitions encourage
                <strong> teamwork, problem-solving, and critical thinking skills</strong>, and often involve
                collaboration with other teams and schools.
              </p>
            </div>
            <img className="content-image" src="/images/robot1.jpeg" alt="VEX Robotics competition robot built by Team 1784" />
          </div>

          <div className="content-row reverse">
            <div className="content-text">
              <p>
                Robotics programs provide students with an opportunity to learn about <strong>STEM
                (Science, Technology, Engineering, and Mathematics)</strong> concepts and apply them in a practical setting.
                Students develop technical skills in <strong>mechanics, electronics, and computer programming</strong>,
                as well as soft skills such as <strong>communication, leadership, and teamwork.</strong>
              </p>
            </div>
            <img className="content-image" src="/images/roboticscollaboration.jpg" alt="Students collaborating on robotics project" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h2>This Year's Game</h2>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/Sx6HJSpopeQ"
              allowFullScreen
              title="VEX Robotics High Stakes Game Animation"
            ></iframe>
          </div>
          <p className="game-description">
            "VEX V5 Robotics Competition High Stakes is played on a 12' x 12' square field.
            Two Alliances — one red and one blue — composed of two Teams each, compete in matches
            consisting of a 15-second Autonomous Period, followed by a 1:45 Driver Controlled Period.
            The object is to attain a higher score by Scoring Rings on Stakes, Placing Mobile Goals,
            and Climbing at the end of the Match."
          </p>
          <a href="https://www.vexrobotics.com/v5/competition/vrc-current-game" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Learn More at VEX Robotics <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
