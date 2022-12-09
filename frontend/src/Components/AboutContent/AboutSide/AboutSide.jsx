import React, { useState } from "react";
import "./AboutSide.scss";
import {Link} from 'react-router-dom'


const AboutSide = (props) => {
  let [help] = useState(true);
  let [faq] = useState(true);
  let [rules] = useState(true);

  return (
    <div className="col-sm about_side">
      <div className="row">
        {help ? (
          <span>
            <button className="span-button">
              Помощь <span></span>
            </button>
            <p>
              Но повышение уровня гражданского сознания предопределяет высокую
              востребованность вывода текущих активов. Прежде всего, выбранный
              нами инновационный путь позволяет выполнить важные задания по
              разработке первоочередных требований.
            </p>
          </span>
        ) : (
          <button>
            Помощь <span></span>
          </button>
        )}
      </div>
      <div className="row">
        {faq ? (
          <span>
            <button className="span-button">
              FAQ <span></span>
            </button>
            <p>
              Также как курс на социально-ориентированный национальный проект
              позволяет оценить значение благоприятных перспектив. Повседневная
              практика показывает, что консультация с широким активом прекрасно
              подходит для реализации анализа существующих паттернов поведения.
            </p>
          </span>
        ) : (
          <button>
            FAQ <span></span>
          </button>
        )}
      </div>
      <div className="row">
        {rules ? (
          <span>
            <button className="span-button">
              Правила <span></span>
            </button>
            <p>
              Разнообразный и богатый опыт говорит нам, что семантический разбор
              внешних противодействий напрямую зависит от поэтапного и
              последовательного развития общества. Современные технологии
              достигли такого уровня, что высококачественный прототип будущего
              проекта играет определяющее значение для вывода текущих активов.
            </p>
          </span>
        ) : (
          <button>
            Правила <span></span>
          </button>
        )}
      </div>
      <div className="row learn">
        <div className="col-sm">
          <a target='_blank' href="https://clck.ru/32u3vP">Обучение</a>
        </div>
      </div>
    </div>
  );
};

export default AboutSide;
