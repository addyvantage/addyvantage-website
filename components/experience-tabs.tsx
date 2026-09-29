"use client";

import { useRef, useState } from "react";
import { experience } from "@/data/experience";

const STEPS: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/** Selectable list on the left, details on the right. All panels are in the HTML; inactive ones are hidden. */
export function ExperienceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number) => {
    const next = (index + experience.length) % experience.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Home") select(0);
    else if (event.key === "End") select(experience.length - 1);
    else if (event.key in STEPS) select(active + STEPS[event.key]);
    else return;
    event.preventDefault();
  };

  return (
    <div className="exp">
      <div aria-label="Experience" aria-orientation="vertical" className="exp-tabs" onKeyDown={onKeyDown} role="tablist">
        {experience.map((item, i) => (
          <button aria-controls={`exp-panel-${item.id}`} aria-selected={i === active} className="exp-tab" id={`exp-tab-${item.id}`} key={item.id} onClick={() => setActive(i)} ref={(node) => { tabs.current[i] = node; }} role="tab" tabIndex={i === active ? 0 : -1} type="button">
            <span className="label">{item.period}</span>
            <strong>{item.org}</strong>
          </button>
        ))}
      </div>
      {experience.map((item, i) => (
        <div aria-labelledby={`exp-tab-${item.id}`} className="exp-panel" hidden={i !== active} id={`exp-panel-${item.id}`} key={item.id} role="tabpanel" tabIndex={0}>
          <span className="label">{item.period}</span>
          <h3>{item.org}</h3>
          <p className="exp-role">{item.role}</p>
          <p>{item.summary}</p>
          <p>{item.details}</p>
          <ul className="tag-row label">
            {item.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
