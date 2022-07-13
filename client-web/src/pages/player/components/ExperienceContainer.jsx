import ValorExperience from "./ValorExperience";


const ExperienceContainer = (props) => {
    let profile = props.profile;

    if(!profile) {
        return "";
    }

    let valor = profile.lastActiveCharacterProfile.progressions.valor;
    return (
        <div>
            <ValorExperience valor={valor} />
        </div>
    );
}

export default ExperienceContainer;