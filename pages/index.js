
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';

import Person from "../lib/generator/person";
import Organization from "../lib/generator/organization";
import Website from "../lib/generator/website";
import Breadcrumbs from "../lib/generator/breadcrumbs";
import Article from "../lib/generator/article";
import Product from "../lib/generator/product";
import Faq from "../lib/generator/faq";

export default function Home() {

  const [selectType, setSelectType] = useState('person')
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  const [generatorOutputJson, setGeneratorOutputJson] = useState('')
  const [generatorOutputMicrodata, setGeneratorOutputMicrodata] = useState('')
  const [outputTab, setOutputTab] = useState('json')

  const generate = (json, microdata) => {
    setGeneratorOutputJson('<script type="application/ld+json">\r\n' + JSON.stringify(json, null, 4) + '\r\n</script>');
    setGeneratorOutputMicrodata(microdata);
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(outputTab === 'json' ? generatorOutputJson : generatorOutputMicrodata);
    setCopiedToClipboard(true);
  }

  useEffect(() => {
    let timer1 = setTimeout(() => setCopiedToClipboard(false), 1500)
    return () => {
      clearTimeout(timer1)
    }
  },[copiedToClipboard]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Microdata online generator</h1>
          <p>Zobacz <a href="https://github.com/kamilwyremski/microdata-generator" target="_blank" rel="noopener noreferrer nofollow" title="Microdata generator online">kod źródłowy na GitHubie</a></p>
        </header>
        
        <div className={styles.grid}>
          <div className={styles.generatorSource}>
            <div className={styles.formGroup}>
              <label htmlFor="selectType">Wybierz rodzaj znaczników <a href="https://schema.org" target="_blank" rel="noopener noreferrer" title="Schema">Schema.org</a></label>
              <select id="selectType" value={selectType} onChange={e => setSelectType(e.target.value)}>
                <option value="person">Osoba (Person)</option>
                <option value="organization">Organizacja (Organization)</option>
                <option value="website">Strona www (Website)</option>
                <option value="breadcrumbs">Nawigacja okruszkowa (Breadcrumbs)</option>
                <option value="article">Artykuł (Article)</option>
                <option value="product">Produkt (Product)</option>
                <option value="faq">Pytania i odpowiedzi (FAQ)</option>
              </select>
            </div>
            {selectType === "person" &&
              <Person generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType === "organization" &&
              <Organization generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType === "website" &&
              <Website generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType === "breadcrumbs" &&
              <Breadcrumbs generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType === "article" &&
              <Article generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType === "product" &&
              <Product generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType === "faq" &&
              <Faq generate={(json,microdata) => generate(json, microdata)}/>
            }
          </div>
          <div className={styles.generatorTarget}>
            <nav>
              <button onClick={() => setOutputTab('json')} className={`${styles.btn} ${outputTab == 'json' ? styles.btnActive : ''}`}>JSON-LD</button>
              <button onClick={() => setOutputTab('microdata')} className={`${styles.btn} ${outputTab == 'microdata' ? styles.btnActive : ''}`}>Microdata</button>
            </nav>
            <div className={styles.formGroup}>
              {outputTab == 'json' &&
                <textarea value={generatorOutputJson} readOnly></textarea>
              }
              {outputTab == 'microdata' &&
                <textarea value={generatorOutputMicrodata} readOnly></textarea>
              }
            </div>
            <button className={styles.btn} onClick={() => copyToClipboard()}>Skopiuj do schowka</button>
            {copiedToClipboard && <span>Pomyślnie skopiowano</span>}
            <form action="https://validator.schema.org/" target="_blank" method="post">
              <textarea name="code" className={styles.dNone} value={outputTab == 'json' ? generatorOutputJson: generatorOutputMicrodata} readOnly></textarea>
              <button className={`${styles.btn} ${styles.btnActive}`}>Sprawdź w Google</button>
            </form>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://wyremski.pl" target="_blank" rel="noopener noreferrer" title="Full Stack Web Developer"
        >Created 2021 - 2023 by Kamil Wyremski</a>
      </footer>
    </div>
  )
}
