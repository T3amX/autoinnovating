import React, { useState } from "react";
import './AboutSide.scss';

const AboutSide = (props) => {
  let [help, setHelp] = useState(false);
  let [faq, setFaq] = useState(false);
  let [rules, setRules] = useState(false);

  return (
    <div className="col-sm about_side">
      <div className="row">
        {help ? (
          <span>
            <button onClick={() => setHelp(false)}>
              Помощь <span>˄</span>
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              blanditiis rem iure expedita consequatur asperiores iste sunt, sit
              illum voluptates laboriosam, facere repellendus impedit quae
              reiciendis, voluptatem voluptate et. Voluptas.
            </p>
          </span>
        ) : (
          <button onClick={() => setHelp(true)}>
            Помощь <span>˅</span>
          </button>
        )}
      </div>
      <div className="row">
        {faq ? (
          <span>
            <button onClick={() => setFaq(false)}>
              FAQ <span>˄</span>
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              blanditiis rem iure expedita consequatur asperiores iste sunt, sit
              illum voluptates laboriosam, facere repellendus impedit quae
              reiciendis, voluptatem voluptate et. Voluptas.
            </p>
          </span>
        ) : (
          <button onClick={() => setFaq(true)}>
            FAQ <span>˅</span>
          </button>
        )}
      </div>
      <div className="row">
        {rules ? (
          <span>
            <button onClick={() => setRules(false)}>
              Правила <span>˄</span>
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              blanditiis rem iure expedita consequatur asperiores iste sunt, sit
              illum voluptates laboriosam, facere repellendus impedit quae
              reiciendis, voluptatem voluptate et. Voluptas.
            </p>
          </span>
        ) : (
          <button onClick={() => setRules(true)}>
            Правила <span>˅</span>
          </button>
        )}
      </div>
      <div className="row learn">
        <h4>Обучение</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          assumenda doloremque officiis dignissimos ad nostrum obcaecati.
          Perferendis atque amet qui. Quidem cumque eaque facilis maiores autem
          reprehenderit dicta deleniti accusamus?
        </p>
      </div>
    </div>
  );
};

export default AboutSide;
