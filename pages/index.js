
import styles from '../styles/Home.module.css'
import { useState } from "react"

import Person from "../lib/generator/person"

export default function Home() {

  const [selectType, setSelectType] = useState('person')

  const [generatorOutputJson, setGeneratorOutputJson] = useState('')
  const [generatorOutputMicrodata, setGeneratorOutputMicrodata] = useState('')
  const [outputTab, setOutputTab] = useState('json')

  const generate = (json, microdata) => {
    setGeneratorOutputJson(json);
    setGeneratorOutputMicrodata(microdata);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Microdata online generator</h1>
        
        <div className={styles.grid}>
          <div className={styles.generatorSource}>
            <div className={styles.formGroup}>
              <label for="selectType">Wybierz rodzaj znaczników <a href="https://schema.org" target="_blank" rel="noopener noreferrer" title="Schema">Schema.org</a></label>
              <select id="selectType" value={selectType} onChange={e => setSelectType(e.target.value)}>
                <option value="person">Person</option>
                <option value="website">Website</option>
              </select>
            </div>
            {selectType=="person" &&
              <Person generate={(json,microdata) => generate(json, microdata)}/>
            }
          </div>
          <div className={styles.generatorTarget}>
            <nav className={styles.navTab}>
              <button onClick={() => setOutputTab('json')} className={`${styles.btn} ${outputTab == 'json' ? styles.btnActive : ''}`}>JSON-LD</button>
              <button onClick={() => setOutputTab('microdata')} className={`${styles.btn} ${outputTab == 'microdata' ? styles.btnActive : ''}`}>Microdata</button>
            </nav>
            {outputTab == 'json' &&
              <textarea value={generatorOutputJson}></textarea>
            }
            {outputTab == 'microdata' &&
              <textarea value={generatorOutputMicrodata}></textarea>
            }
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
