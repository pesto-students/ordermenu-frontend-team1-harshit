import { dehydrate, QueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, ModalHeader, useDisclosure } from "@chakra-ui/react";

import { CategorizedProducts, HeroSection, Meta, ScrollToTabs } from "../../components/";
import { getPartnerBySlug } from "../../apis";
import { setPartner } from "../../store/partnerSlice";
import { reloadCart, setTableId } from "../../store/cartSlice";

const Partner = ({ partner }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(setPartner(partner))
        if (!router?.query?.tableNumber) {
            onOpen()
        }
        if (router?.query?.tableNumber) {
            const tableId = partner?.tables?.find((table) => table?.number === Number(router?.query?.tableNumber))?._id
            dispatch(setTableId(tableId))
            onClose()
        }
        sessionStorage.setItem("restaurantSlug", `${router?.query?.slug}`)
        sessionStorage.setItem("tableNumber", `${router?.query?.tableNumber}`)
    }, [dispatch, partner, router?.query?.tableNumber, router?.query?.slug, onOpen, onClose])

    useEffect(() => {
        if (partner?.slug) {
            const cart = JSON.parse(localStorage.getItem(`${partner?.slug}`))
            if (cart?.length > 0) {
                dispatch(reloadCart(cart))
            }
        }
    }, [partner?.slug, dispatch])

    const categorizedProducts = partner?.categories?.map(category => ({ name: category.name, products: partner?.menu?.filter((product) => product.category === category.name) }))

    return (
        <>
            <Meta title={partner?.name} description={partner?.name + " - " + partner?.tagline} url={`https://www.ordermenu.live/restaurant/${partner?.slug}`} />
            <HeroSection background={partner?.background} logo={partner?.logo} name={partner?.name} tagline={partner?.tagline} description={partner?.description} address={partner?.address} />
            <ScrollToTabs categories={partner?.categories} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Important</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        To make an order please scan the qr code available on your table.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='brand' variant='ghost' mr={3} onClick={onClose}>
                            Continue Expolring Menu
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {
                categorizedProducts?.map((categorizedProduct) => <CategorizedProducts key={categorizedProduct.name} categorizedProducts={categorizedProduct} />)
            }
        </>
    );
}

export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" }
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