import { dehydrate, QueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { CategorizedProducts, HeroSection, ScrollToTabs } from "../../components/";
import { getPartnerBySlug } from "src/apis";
import { setPartner } from "src/store/partnerSlice";
import { useRouter } from "next/router";
import { setTableNumber } from "src/store/cartSlice";

interface IPartnerProps {

}

const Partner = ({ partner }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(setPartner(partner))
        router?.query?.tableNumber && dispatch(setTableNumber(router?.query?.tableNumber))
    }, [dispatch, partner, router?.query?.tableNumber])

    const categorizedProducts = partner?.categories?.map(category => ({ name: category.name, products: partner?.menu?.filter((product) => product.category === category.name) }))
    return (
        <>
            <HeroSection background={partner?.background} logo={partner?.logo} name={partner?.name} tagline={partner?.tagline} description={partner?.description} address={partner?.address} />
            <ScrollToTabs categories={partner?.categories} />

            {
                categorizedProducts?.map((categorizedProduct) => <CategorizedProducts key={categorizedProduct.name} categorizedProducts={categorizedProduct} />)
            }
        </>
    );
}

export async function getStaticPaths() {
    return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: false,
                refetchOnMount: false,
                refetchInterval: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                refetchIntervalInBackground: false
            }
        }
    });

    await queryClient.prefetchQuery([params.slug], () => getPartnerBySlug(params.slug));
    const partner = dehydrate(queryClient)?.queries[0]?.state?.data;

    return {
        props: {
            partner
        }
    };
}


export default Partner