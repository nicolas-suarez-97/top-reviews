import React from "react";
import styles from "./breadcrum.module.scss";
import Link from "next/link";

const BreadcrumbComponent = ({steps, stepIds }) => {
    return (
        <ul className={styles.breadcrumb} data-testid="breadcrumb">
            {steps.map((step, index) => (
                step !== steps[steps.length-1]
                    ? <li key={step} className={styles.breadcrumb__item}><Link href={`/${stepIds[index]}`}>{step}</Link></li>
                    : <li key={step} className={styles.breadcrumb__last} data-testid="last-item">{step}</li>
            ))}
        </ul>
    );
}

export default BreadcrumbComponent;