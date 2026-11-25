
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
  const [clipboardStatus, setClipboardStatus] = useState(null)

  const [generatorOutputJson, setGeneratorOutputJson] = useState('')
  const [generatorOutputMicrodata, setGeneratorOutputMicrodata] = useState('')
  const [outputTab, setOutputTab] = useState('json')

  const generate = (json, microdata) => {
    setGeneratorOutputJson('<script type="application/ld+json">\r\n' + JSON.stringify(json, null, 4) + '\r\n</script>');
    setGeneratorOutputMicrodata(microdata);
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputTab === 'json' ? generatorOutputJson : generatorOutputMicrodata);
      setClipboardStatus({ success: true, message: 'Pomyślnie skopiowano' });
    } catch (error) {
      console.error('Nie udało się skopiować kodu:', error);
      setClipboardStatus({ success: false, message: 'Nie udało się skopiować kodu. Skopiuj go ręcznie.' });
    }
  }

  useEffect(() => {
    if (!clipboardStatus?.success) return
    let timer1 = setTimeout(() => setClipboardStatus(null), 1500)
    return () => {
      clearTimeout(timer1)
    }
  },[clipboardStatus]);

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
            <span role="status">{clipboardStatus?.message}</span>
            <form action="https://search.google.com/test/rich-results" target="_blank" method="post" onSubmit={() => copyToClipboard()}>
              <textarea name="code" className={styles.dNone} value={outputTab == 'json' ? generatorOutputJson: generatorOutputMicrodata} readOnly></textarea>
              <button className={`${styles.btn} ${styles.btnActive}`}>Sprawdź w Google</button>
              <span>Kod zostanie skopiowany. Wklej go w Google.</span>
            </form>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://wyremski.pl" target="_blank" rel="noopener noreferrer" title="Full Stack Web Developer"
        >Created 2021 - 2026 by Kamil Wyremski</a>
      </footer>
    </div>
  )
}
