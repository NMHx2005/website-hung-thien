import BenefitsSection from "@/components/client/home/benefit/benefitsSection";
import CategoryList from "@/components/client/home/category/categoryList";
import { NewEvents } from "@/components/client/home/events/newEvents";
import Partner from "@/components/client/home/partner/partner";
import Slogan from "@/components/client/home/slogan/Slogan";


const HomePage = () => {
    return (
        <>
            <Slogan />
            <BenefitsSection />
            <CategoryList />
            <Partner />
            <NewEvents />
        </>
    )
}

export default HomePage;