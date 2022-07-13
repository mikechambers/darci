import ValorExperience from "./ValorExperience";


const ExperienceContainer = (props) => {
    let profile = props.profile;

    if(!profile) {
        return "";
    }

    //int nextLvl = rank == null ? null : rank.currentProgress + rank.nextLevelAt - rank.progressToNextLevel;

    let valor = profile.lastActiveCharacterProfile.progressions;
    console.log(valor);
    return (
        <div>
            <ValorExperience valor={valor} />
        </div>
    );
}

export default ExperienceContainer;