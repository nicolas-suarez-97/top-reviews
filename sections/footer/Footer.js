import React, {Component} from 'react';
import styles from './styles.module.scss';
import Link from "next/link";

const Footer = () => {
    const items = [
        'about',
        'faq',
        'privacy',
        'terms',
        'disclaimer',
        'support us',
        'contact',
        'categories',
    ];
    return (
        <div className={styles.footer}>
            <ul className={styles.footer__options}>
                {items.map(i => (
                    <li key={i}><Link href={`/${i}`}>{i}</Link></li>
                ))}
            </ul>
        </div>
    );
}

export default Footer;