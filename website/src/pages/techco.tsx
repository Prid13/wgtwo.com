import React, { useState, useEffect, useRef } from "react"
import sample from "lodash/sample"
import Layout from "@theme/Layout"
import styles from "./techco.module.css"
import common from "../css/common.module.css"
import * as HeadlineDictionary from "../util/HeadlineDictionary"
import Link from "@docusaurus/Link"
import {
  Lightbulb,
  RotateCcw,
  Copy,
  Share2,
  Twitter,
  MessageCircle,
  Repeat,
  Heart,
  Share,
} from "lucide-react"
import Image from "@theme/IdealImage"
import LoadingImg from "../../static/img/spinning_gear.gif"

function generateHeadline(name, action, outcome) {
  const adjectives = HeadlineDictionary.adjectives
  const nouns = HeadlineDictionary.nouns
  const endings = HeadlineDictionary.endings

  const templates = ["{name} {action} {adjective} {noun} {outcome}, {ending}"]

  return formatString(templates[0], {
    name,
    action,
    adjective: sample(adjectives),
    noun: sample(nouns),
    outcome,
    ending: sample(endings),
  })
}

function Component() {
  const actions = HeadlineDictionary.actions
  const outcomes = HeadlineDictionary.outcomes

  const [showResults, setShowResults] = useState(false)
  const [sharingDisplay, setSharingDisplay] = useState(false)
  const [text, setText] = useState("")
  const [formData, setFormData] = useState({})

  let form = {
    name: useRef(""),
    action: useRef(""),
    outcome: useRef(""),
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  })

  const showResultsPage = event => {
    setShowResults(true) // switch to render results page

    const name = form.name.current.value
    const action = form.action.current.value
    const outcome = form.outcome.current.value

    setText(generateHeadline(name, action, outcome))

    const urlParams = {
      name,
      action,
      outcome,
    }
    //addUrlParams(urlParams);

    // save for later, for use in "re-generate" (generateNewText)
    setFormData({
      name,
      action,
      outcome,
    })
  }

  const generateNewText = () => {
    setText(generateHeadline(formData.name, formData.action, formData.outcome))
  }

  const copyText = () => {
    navigator.clipboard.writeText(text)
  }

  if (!showResults) {
    return (
      <Layout title="TechCo Headline Generator">
        <div className={common.page} style={{ marginBottom: "30px" }}>
          <div className={common.container}>
            <div className={common.centeredText}>
              <div className={styles.header}>The Instant TechCo Generator</div>
              <br />
              <div className={styles.subtitle}>
                Many telecom operators strive to work and operate like tech companies. The
                journey might seem like a challenge. It doesn’t have to be! Take
                a shortcut with our Instant TechCo Generator. Create that perfect
                headline for your webpage, blog post or late-night tweet.
              </div>
            </div>
          </div>
          <div className={`${common.container} ${styles.formContainer}`}>
            <div className={`${styles.subheader} ${common.centeredText}`}>
              Welcome to The Instant TechCo Generator
            </div>
            <form className={styles.form} onSubmit={showResultsPage}>
              <input
                ref={form.name}
                type="text"
                placeholder="Organization name"
                className={styles.span2}
                required
              />
              <select ref={form.action} className={styles.span2} required>
                <option value="" hidden>
                  Choose your Action
                </option>
                {actions.map(item => (
                  <option key={item}>{item}</option>
                ))}
                ;
              </select>
              <select ref={form.outcome} className={styles.span2} required>
                <option value="" hidden>
                  Choose your desired outcome
                </option>
                {outcomes.map(item => (
                  <option key={item}>{item}</option>
                ))}
                ;
              </select>
              <button
                className={`${common.button} ${common.buttonPrimary} ${styles.span2}`}
              >
                Generate
              </button>
            </form>
          </div>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout title="TechCo Headline Generator">
        {/* Icon by icons8.com */}
        <Image img={LoadingImg} className={styles.loading} />
        <div
          className={`${common.page} ${styles.fadeTransition}`}
          style={{ background: "white" }}
        >
          {sharingDisplay === false && (
            <div className={common.container}>
              <h3 className={styles.headline}>{text}</h3>
            </div>
          )}
          {sharingDisplay === true && (
            <div className={`${common.container} ${styles.twitterContainer}`}>
              <div className={`${common.container} ${styles.twitterHeader}`}>
                <div className={styles.avatarCircle}></div>
                <div className={styles.twitterUsernameBlock}>
                  <div>{formData.name}</div>
                  <div>@{formData.name}</div>
                </div>
                <Twitter color="#008cff" />
              </div>
              <p className={styles.twitterText}>
                So you wanna be a TechCo? Become one instantly with the headline
                generator from{" "}
                <span className={styles.blueText}>@workinggrouptwo</span>.
                <br />
                Here's mine:
                <br />
                {text}
                <br />
                <span className={styles.blueText}>
                  #TechCo #mobile #telcocloud #generator
                </span>
              </p>
              <div className={`${common.container} ${styles.twitterButtons}`}>
                <MessageCircle />
                <Repeat />
                <Heart />
                <Share />
              </div>
            </div>
          )}

          <div className={common.container} style={{ marginBottom: "50px" }}>
            <div className={`${styles.form} ${styles.fourColumnGrid}`}>
              <button
                className={`${common.button} ${styles.blueButton}`}
                onClick={generateNewText}
              >
                <Lightbulb />
                Another
              </button>
              <button
                className={`${common.button} ${styles.blueButton}`}
                onClick={() => setShowResults(false)}
              >
                <RotateCcw />
                Restart
              </button>
              <button
                className={`${common.button} ${styles.grayButton}`}
                onClick={copyText}
              >
                <Copy />
                Copy
              </button>
              <button
                className={`${common.button} ${styles.grayButton}`}
                onClick={() => setSharingDisplay(true)}
              >
                <Share2 />
                Share
              </button>
            </div>
          </div>

          <div
            className={`${common.container} ${common.text} ${styles.contactSection}`}
          >
            If you don't want to take shortcuts but still want to become a
            TechCo, get in touch with the team at Working Group Two.
            <br />
            <Link
              to="/contact"
              target="_self"
              className={`${common.button} ${common.buttonPrimary}`}
            >
              Contact Us
            </Link>
          </div>

          <div
            className={`${common.section} ${common.sectionGray}`}
            style={{ paddingTop: "40px", paddingBottom: "60px" }}
          >
            <div className={`${common.container} ${styles.footerSection}`}>
              <h2 className={common.centeredText}>
                *What’s a TechCo anyway?
                <br />
                <br />
                According to the folks over at STL Partners (an analyst
                company), it’s:
              </h2>
              <blockquote>
                The concept of changing from a telco to a techco (a telecoms
                operator to a technology company). It is a new way to reflect a
                long-standing desire of telcos to change. Many telco CEOs and
                boards would like to make the companies they run more capable of
                growing and adapting to changes in their environments. They
                would also like to embrace concepts developed in techcos, such
                as agile methods, that allow more rapid change.
                <br />
                Read more:{" "}
                <a href="https://stlpartners.com/insights/from-telco-to-techco/">
                  https://stlpartners.com/insights/from-telco-to-techco/
                </a>
              </blockquote>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

// credit: https://stackoverflow.com/a/69718380/3705191
function formatString(str, values) {
  return str.replace(/{(\w+)}/g, function (match, key) {
    // check if the argument is there
    return typeof values[key] == "undefined" ? match : values[key]
  })
}

function addUrlParams(params) {
  const url = new URL(window.location.href)
  Object.keys(params).forEach(p => {
    const val = params[p]
    url.searchParams.set(p, val)
  })
  window.history.replaceState(null, null, url)
}

export default Component
