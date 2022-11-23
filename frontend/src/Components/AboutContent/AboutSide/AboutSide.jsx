import React, { useState } from "react";
import './AboutSide.scss';

const AboutSide = (props) => {
  let [help, ] = useState(true);
  let [faq, ] = useState(true);
  let [rules,] = useState(true);

  return (
    <div className="col-sm about_side">
      <div className="row">
        {help ? (
          <span>
            <button >
              Помощь <span></span>
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              blanditiis rem iure expedita consequatur asperiores iste sunt, sit
              illum voluptates laboriosam, facere repellendus impedit quae
              reiciendis, voluptatem voluptate et. Voluptas.
            </p>
          </span>
        ) : (
          <button >
            Помощь <span></span>
          </button>
        )}
      </div>
      <div className="row">
        {faq ? (
          <span>
            <button >
              FAQ <span></span>
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              blanditiis rem iure expedita consequatur asperiores iste sunt, sit
              illum voluptates laboriosam, facere repellendus impedit quae
              reiciendis, voluptatem voluptate et. Voluptas.
            </p>
          </span>
        ) : (
          <button >
            FAQ <span></span>
          </button>
        )}
      </div>
      <div className="row">
        {rules ? (
          <span>
            <button >
              Правила <span></span>
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              blanditiis rem iure expedita consequatur asperiores iste sunt, sit
              illum voluptates laboriosam, facere repellendus impedit quae
              reiciendis, voluptatem voluptate et. Voluptas.
            </p>
          </span>
        ) : (
          <button>
            Правила <span></span>
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
