import React from 'react';

export default function ProfilePage(props) {
  const { match } = props;
  return (
    <section className="page-content">
        <div className="row">
            <div className="col-sm-12 col-md-8">
                <p>
                This is the profile page. The profile id is : {match.params.id}
                </p>
                <aside className="col-sm-12 col-md-4">
                This is profilepage  sidebar:
                </aside>

            </div>
        </div>
    </section>
  );
}
