export default function Actors({ actors = [] }: { actors?: string[] }) {
    if (!actors || actors.length === 0) return null;

    return (
        <div className='child-box child-actors'>
            <div className='child-header'>Diễn viên</div>
            <div className='child-actors-list'>
                {actors.map((actor, index) => (
                    <div className='v-item' key={index}>
                        <a className='v-actor v-actor-medium' href='#'>
                            <img
                                alt={actor}
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&background=random&color=fff&size=500`}
                            />
                        </a>
                        <div className='info'>
                            <h4 className='item-title lim-2'>
                                <a href='#'>{actor}</a>
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
