import React from "react";
import Layout from "../../sections/layout/Layout";
import styles from "./disclaimer.module.scss";
import Image from "next/image";
import teardown from "../../assets/ProductTeardown.svg";

const Index = () => {
    return(
        <Layout>
            <div className={styles.container}>
                <h1>Disclaimer</h1>
                <p className={styles.content}>
                    The information in TopReviews is just for informational purposes and shall not be taken as an advise
                    or a recommendation to acquire any product or service.
                </p>
                <p className={styles.content}>
                    We strongly recommend that professional advice is obtained before you purchase any
                    product or service via TopReviews.
                </p>

                <Image
                    src={teardown}
                    width={200}
                    height={200}
                    alt="Product Teardown Image"
                />
            </div>
        </Layout>
    )
}

export default Index;