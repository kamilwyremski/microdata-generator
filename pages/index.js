
import { useState, useEffect } from "react"
import styles from '../styles/Home.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Person from "../lib/generator/person"
import Website from "../lib/generator/website"
import Breadcrumbs from "../lib/generator/breadcrumbs"
import Article from "../lib/generator/article"
import Product from "../lib/generator/product"

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
              <label for="selectType">Wybierz rodzaj znaczników <a href="https://schema.org" target="_blank" rel="noopener noreferrer" title="Schema">Schema.org</a></label>
              <select id="selectType" value={selectType} onChange={e => setSelectType(e.target.value)}>
                <option value="person">Osoba (Person)</option>
                <option value="website">Strona www (Website)</option>
                <option value="breadcrumbs">Nawigacja okruszkowa (Breadcrumbs)</option>
                <option value="article">Artykuł (Article)</option>
                <option value="product">Produkt (Product)</option>
              </select>
            </div>
            {selectType=="person" &&
              <Person generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType=="website" &&
              <Website generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType=="breadcrumbs" &&
              <Breadcrumbs generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType=="article" &&
              <Article generate={(json,microdata) => generate(json, microdata)}/>
            }
            {selectType=="product" &&
              <Product generate={(json,microdata) => generate(json, microdata)}/>
            }
          </div>
          <div className={styles.generatorTarget}>
            <nav className={styles.navTab}>
              <button onClick={() => setOutputTab('json')} className={`${styles.btn} ${outputTab == 'json' ? styles.btnActive : ''}`}>JSON-LD</button>
              <button onClick={() => setOutputTab('microdata')} className={`${styles.btn} ${outputTab == 'microdata' ? styles.btnActive : ''}`}>Microdata</button>
            </nav>
            {outputTab == 'json' &&
              <textarea value={generatorOutputJson} readOnly></textarea>
            }
            {outputTab == 'microdata' &&
              <textarea value={generatorOutputMicrodata} readOnly></textarea>
            }
            <CopyToClipboard text={outputTab == 'json' ? generatorOutputJson : generatorOutputMicrodata} onCopy={() => setCopiedToClipboard(true)}>
              <button className={styles.btn}>Skopiuj do schowka</button>
            </CopyToClipboard>
            {copiedToClipboard && <span>Pomyślnie skopiowano</span>}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://wyremski.pl" target="_blank" rel="noopener noreferrer" title="Full Stack Web Developer"
        >Created 2021 by Kamil Wyremski</a>
      </footer>
    </div>
  )
}
