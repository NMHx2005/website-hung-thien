import MissionSection from "@/components/client/home/mission/missionSection";
import BenefitsSection from "@/components/client/home/benefit/benefitsSection";
import ProjectSection from "@/components/client/home/project/projectSection";
import { NewEvents } from "@/components/client/home/events/newEvents";
import Partner from "@/components/client/home/partner/partner";


const HomePage = () => {
    return (
        <>
            <MissionSection />
            <BenefitsSection />
            <ProjectSection />
            <Partner />
            <NewEvents />
        </>
    )
}

export default HomePage;