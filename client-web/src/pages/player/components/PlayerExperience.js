const PlayerExperience = (props) => {
    return (
        <div>
            <div>Player Experience</div>
            <PlayerValorExperience />
            <PlayerGloryExperience />
            <PlayerTrialsExperience />
        </div>
    );
};

const PlayerValorExperience = (props) => {
    return (
        <div>Valor</div>
    );
};

const PlayerGloryExperience = (props) => {
    return (
        <div>Glory</div>
    );
};

const PlayerTrialsExperience = (props) => {
    return (
        <div>Trials</div>
    );
};

export default PlayerExperience;
export { PlayerValorExperience, PlayerGloryExperience, PlayerTrialsExperience };